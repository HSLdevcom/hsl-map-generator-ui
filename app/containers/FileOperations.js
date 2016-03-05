import { connect } from 'react-redux';
import FileOperations from '../components/FileOperations';
import { ipcRenderer } from 'electron';
import { toJSON } from 'transit-immutable-js';

function mapStateToProps(state) {
  return {
    state: state,
    onGenerateImage: () => ipcRenderer.send('generateImage', toJSON(state.mapSelection))
  };
}

ipcRenderer.on('imageGenerated', (event, arg) => {
    console.log(arg)
});

export default connect(mapStateToProps)(FileOperations);
