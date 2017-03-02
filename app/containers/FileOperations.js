import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
import { toJSON } from "transit-immutable-js";
import FileOperations from "../components/FileOperations";
import { generateImage } from "../actions/apiRequests";
import { loadState } from "../actions/fileOperations";

import { mapSelectionToWorldFile } from "../utils/geom-utils";

function mapStateToProps(state) {
    return {
        onSaveState: () => {
            saveAs(new Blob([toJSON(state)], { type: "application/json" }), "map.json");
        },
        onSaveWorldFile: () => {
            const worldFile = mapSelectionToWorldFile(state.mapSelection);
            saveAs(new Blob([worldFile], { type: "text/plain" }), "map.pgw");
        },
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        generateImage,
        loadState,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileOperations);
