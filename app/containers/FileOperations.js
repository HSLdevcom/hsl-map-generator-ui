import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
import { toJSON, fromJSON } from "transit-immutable-js";
import FileOperations from "../components/FileOperations";
import { generateImageRequest, generateImageSuccess, generateImageError, generateImage } from "../actions/apiRequests";
import { loadState } from "../actions/fileOperations";

function mapStateToProps(state) {
    return {
        onGenerateImage: (imageRequest, imageSuccess, imageError) =>
            generateImage(state, imageRequest, imageSuccess, imageError),
        onSaveState: () =>
            saveAs(new Blob([toJSON(state)], { type: "application/json" }), "map.json"),
        onLoadState: (event, loadFile) => {
            const reader = new FileReader();
            reader.onload = progress => loadFile(fromJSON(progress.target.result));
            reader.readAsText(event.target.files[0]);
        },

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        generateImageRequest,
        generateImageSuccess,
        generateImageError,
        loadState,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileOperations);
