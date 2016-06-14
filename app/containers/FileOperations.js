import { connect } from 'react-redux';
import FileOperations from '../components/FileOperations';
// import { ipcRenderer } from 'electron';
import { toJSON, fromJSON } from 'transit-immutable-js';
import { styleFromLayers } from '../utils/map-utils';
import { saveAs } from '../utils/FileSaver';
import { loadState } from '../actions/fileOperations';

function mapStateToProps(state) {
  return {
    state,
    // onGenerateImage: () =>
    //   ipcRenderer.send('generateImage', {
    //     mapSelection: toJSON(state.mapSelection),
    //     style: styleFromLayers(state.layers).toJS(),
    //   }),
    // onGenerateStopLabels: () =>
    //   ipcRenderer.send('generateStopLabels', {
    //     mapSelection: toJSON(state.mapSelection),
    //   }),
    onGenerateImage: () =>
      fetch('http://localhost:4000/generateImage', {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
          'Content-Type': 'application/json',
          backend: 'mapgenerator',
        }),
        body: JSON.stringify({
          mapSelection: toJSON(state.mapSelection),
          style: styleFromLayers(state.layers).toJS(),
        }),
      })
      .then(response => response.blob())
      .then(blob => saveAs(blob, 'map.png')),
    onGenerateStopLabels: () =>
      fetch('http://localhost:4000/generateStopLabels', {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
          'Content-Type': 'application/json',
          backend: 'mapgenerator',
        }),
        body: JSON.stringify({
          mapSelection: toJSON(state.mapSelection),
        }),
      })
      .then(response => response.blob())
      .then(blob => saveAs(blob, 'stops.html')),
    onSaveState: () =>
      saveAs(new Blob([toJSON(state)], { type: 'application/json' }), 'map.json')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoadState: (event) => {
      const reader = new FileReader();
      reader.onload = (progress) => dispatch(loadState(fromJSON(progress.target.result)));
      reader.readAsText(event.target.files[0]);
    }
  };
}

// ipcRenderer.on('imageGenerated', (event, { data }) => {
//   saveAs(new Blob([data], { type: 'image/png' }), 'map.png');
// });
//
// ipcRenderer.on('stopLabelsGenerated', (event, { data }) => {
//   saveAs(new Blob([data], { type: 'text/html' }), 'stops.html');
// });

export default connect(mapStateToProps, mapDispatchToProps)(FileOperations);
