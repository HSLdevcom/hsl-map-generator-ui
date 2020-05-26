import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {saveAs} from "file-saver";
import {toJSON} from "transit-immutable-js";
import FileOperations from "../components/FileOperations";
import {generateImage} from "../actions/apiRequests";
import {toggleSaveWorldFile} from "../actions/settings";
import {loadState} from "../actions/fileOperations";
import {version} from "os";

function mapStateToProps(state) {
    return {
        ...state.settings,
        onSaveState: () => {
            const config = {};
            Object.keys(state).forEach((attribute) => {
                if (attribute === "viewport") {
                    config[attribute] = {
                        altitude: state.viewport.altitude,
                        bearing: state.viewport.bearing,
                        height: state.viewport.height,
                        latitude: state.viewport.latitude,
                        longitude: state.viewport.longitude,
                        zoom: state.viewport.zoom
                    };
                    return;
                }
                config[attribute] = state[attribute];
            });
            saveAs(
                new Blob([toJSON(config)], {type: "application/json"}),
                "map.json"
            );
        }
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            toggleSaveWorldFile,
            generateImage,
            loadState
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileOperations);
