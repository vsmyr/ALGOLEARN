window.addEventListener('DOMContentLoaded', async () => {
    const algorithmsMeta = await window.electronAPI.getAlgorithmsMeta();

    const searchBar = document.getElementById('searchBar');
    const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    const resultsTableBody = document.getElementById('results');

    //returns an Array with the checked categories
    function getActiveCategories() {
        return Array.from(filterCheckboxes).filter(cb => cb.checked).map(cb => cb.name);
    }

    //Navigates to visualizer
    function navigateToVisualizer(filename){
        //fadeout effect 
        document.body.classList.add('fade-out');

        //wait till the animation ends and go to visualizer.html (300ms)
        setTimeout(() => {
            window.location.href = `../views/visualizer.html?algo=${filename}`;
        }, 200);
    }


    //builds a row for the results from the information from each algorithm in algorithmMeta
    function buildRow(algo){
        const tr = document.createElement('tr');
        tr.dataset.filename = algo.filename;

        const tdName = document.createElement('td');
        tdName.textContent = algo.name;

        const tdCategory = document.createElement('td');
        tdCategory.textContent = algo.category;

        const tdDifficulty = document.createElement('td');
        tdDifficulty.textContent = algo.difficulty;
        tdDifficulty.className = `difficulty ${algo.difficulty}`;

        tr.append(tdName, tdCategory, tdDifficulty);

        tr.addEventListener('click', () => navigateToVisualizer(algo.filename));
        return tr;
    }
    //handles the renderer of the results
    function renderResults(list) {
        resultsTableBody.innerHTML = '';
        if(list.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 3;
            td.textContent = 'No algorithms found.';
            tr.appendChild(td);
            resultsTableBody.appendChild(tr);
            return;
        }
        const fragment = document.createDocumentFragment();
        list.forEach(algo => fragment.appendChild(buildRow(algo)));
        resultsTableBody.append(fragment);
    }

    //searches based on the input in the searchbox and the checkboxes
    function filterAlgorithms() {
        const searchTerm = searchBar.value.trim().toLowerCase();
        const activeCategories = getActiveCategories();
        let filtered = algorithmsMeta.filter(algo => {
            const matchesSearch = algo.name.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategories.length === 0 || activeCategories.includes(algo.category);
            if (searchTerm === '') {
                return matchesCategory;
            }
            return matchesSearch && matchesCategory;
        });
        renderResults(filtered);
    }


    filterAlgorithms();
    
    searchBar.addEventListener('input', filterAlgorithms);

    filterCheckboxes.forEach(cb => {
        cb.addEventListener('change', filterAlgorithms);
    })
});