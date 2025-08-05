import { ArrayVisualizer } from '../visualizers/ArrayVisualizer.js';


export default function({ container, controls}) {
    
    const visualizer = new ArrayVisualizer(container);

    const input = [5,3,8,1];
    visualizer.renderArray(input);
}
