// visualizers/ArrayVisualizer.js

export class ArrayVisualizer {
    constructor(containerElement) {
        this.container = containerElement;
        this.arrayElements = []; // referance elements
    }

    renderArray(array) {
        this.container.innerHTML = '';

        // create container div for the array
        const arrayWrapper = document.createElement('div');
        arrayWrapper.style.display = 'flex';
        arrayWrapper.style.gap = '1%';

        // Για κάθε αριθμό στον πίνακα
        array.forEach(value => {
            const bar = document.createElement('div');
            bar.textContent = value;
            bar.style.width = '40px';
            bar.style.height = `${value * 4}px`;
            bar.style.backgroundColor = 'crimson';
            bar.style.color = 'white';
            bar.style.display = 'flex';
            bar.style.alignItems = 'center';
            bar.style.justifyContent = 'center';
            bar.style.borderRadius = '4px';
            bar.style.transition = 'all 0.3s ease';

            arrayWrapper.appendChild(bar);
            this.arrayElements.push(bar);
        });

        this.container.appendChild(arrayWrapper);
    }
}
