import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
import { toJSON } from "transit-immutable-js";
import FileOperations from "../components/FileOperations";
import { generateImageRequest, generateImageSuccess, generateImageError, generateImage, generateStopLabels } from "../actions/apiRequests";

function mapStateToProps(state) {
    return {
        onGenerateImage: (imageRequest, imageSuccess, imageError) =>
            generateImage(state, imageRequest, imageSuccess, imageError),
        onGenerateStopLabels: () => generateStopLabels(state),
        onSaveState: () =>
            saveAs(new Blob([toJSON(state)], { type: "application/json" }), "map.json"),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        generateImageRequest,
        generateImageSuccess,
        generateImageError,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileOperations);
