const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getAlgorithmsMeta: async () => {
        return await ipcRenderer.invoke('get-algorithms-meta');
    }
});