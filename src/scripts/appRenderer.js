

window.addEventListener('DOMContentLoaded', async () => {
    const algorithmsMeta = await window.electronAPI.getAlgorithmsMeta();

    const searchBar = document.getElementById('searchBar');
    const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    const resultsDiv = document.getElementById('results');

    //returns an Array with the checked categories
    function getActiveCategories() {
        return Array.from(filterCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.name);
    }

    //returns the appropriate color for each difficulty
    function getDifficultyColor(difficulty) {
        if(difficulty === 'easy') return 'limegreen';
        if(difficulty === 'medium') return 'gold';
        if(difficulty === 'hard') return 'crimson';
        return 'gray';
    }

    //Navigates to visualizer
    function navigateToVisualizer(filename){
        //fadeout effect 
        document.body.classList.add('fade-out');

        //wait till the animation ends and go to visualizer.html (300ms)
        setTimeout(() => {
            window.location.href = `../views/visualizer.html?algo=${filename}`;
        }, 300);
    }

    //handles the renderer of the results
    function renderResults(list) {
        resultsDiv.innerHTML = '';
        if(list.length === 0) {
            resultsDiv.innerHTML = '<p>No algorithms found. </p>';
            return;
        }
        list.forEach(algo => {
            const div = document.createElement('div');
            div.className = 'algorithm-item';
            div.innerHTML = `
                <span class="name" style="color:var(--primary-blue);"><strong>${algo.name}</strong></span>
                <span class="category" style="color:var(--primary-blue);">${algo.category}</span>
                <span class="difficulty ${algo.difficulty}">${algo.difficulty}</span>
            `;
            div.addEventListener('click', () => {
                navigateToVisualizer(algo.filename);
            });
            resultsDiv.appendChild(div);
        });
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