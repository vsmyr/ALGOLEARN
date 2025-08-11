window.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const algoFileName = params.get('algo');
    const algorithmTitle = document.getElementById('algorithm-title');
    const visualizationWindow = document.getElementById('visualization-window');
    const sidebarControls = document.getElementById('sidebar-controls');
    const backButton = document.getElementById('back-button');

    /* Defensive: check if all elements exist
    if (!algorithmTitle || !visualizationWindow || !sidebarControls || !backButton) {
        console.error('One or more required DOM elements are missing.');
        return;
    } */
    //Back button function
    backButton.addEventListener('click', () => {
        document.body.classList.add('fade-out');
        //fadeout effect
        setTimeout(() => {
            window.location.href = '../views/index.html';
        }, 200);        
    });
    try {
        //import module algorithm.js (replace algorithm with algorithm file name)
        const module = await import(`./algorithms/${algoFileName}`);

        //set the title
        algorithmTitle.textContent = module.visualizerTitle || algoFileName.replace('.js', '');

        if(typeof module.default === 'function') {
            module.default({
                container: visualizationWindow,
                controls: sidebarControls
            });
        } else {
            visualizationWindow.textContent = 'Algorithm visualizer not implemented.';
        }
    } catch (err) {
        algorithmTitle.textContent = 'Algorithm Not Found';
        visualizationWindow.textContent = 'Failed to load algorithm module.';
        console.error('Failed to lοad algorithm module:', err);
    }
});