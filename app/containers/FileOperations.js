import { connect } from 'react-redux';
import FileOperations from '../components/FileOperations';
import { ipcRenderer } from 'electron';
import { toJSON, fromJSON } from 'transit-immutable-js';
import { styleFromLayers } from '../utils/map-utils';
import { saveAs } from '../utils/FileSaver';
import { loadState } from '../actions/FileOperations';

function mapStateToProps(state) {
  return {
    state: state,
    onGenerateImage: () =>
      ipcRenderer.send('generateImage', {
        mapSelection: toJSON(state.mapSelection),
        style: styleFromLayers(state.layers).toJS(),
      }),
    onGenerateStopLabels: () =>
      ipcRenderer.send('generateStopLabels', {
        mapSelection: toJSON(state.mapSelection),
      }),
    onSaveState: () =>
      saveAs(new Blob([toJSON(state)], {type: 'application/json'}), 'map.json')
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

ipcRenderer.on('imageGenerated', (event, {data}) => {
  saveAs(new Blob([data], {type: 'image/png'}), 'map.png');
});

ipcRenderer.on('stopLabelsGenerated', (event, {data}) => {
  saveAs(new Blob([data], {type: 'text/html'}), 'stops.html');
});

export default connect(mapStateToProps, mapDispatchToProps)(FileOperations);
