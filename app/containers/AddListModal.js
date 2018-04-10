import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { addList } from "../actions/publisherRequests";
import AddListModal from "../components/AddListModal";

function mapStateToProps() {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddListModal);
