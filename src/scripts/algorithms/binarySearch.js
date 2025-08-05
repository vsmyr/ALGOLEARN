import { ArrayVisualizer } from '../visualizers/ArrayVisualizer.js';

const container = document.getElementById('visualization-window');
const visualizer = new ArrayVisualizer(container);

const input = [5, 3, 8, 1];
visualizer.renderArray(input);
