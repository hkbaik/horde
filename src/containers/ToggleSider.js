import { connect } from 'react-redux';
import { Layout } from 'antd';

const { Sider } = Layout;

const mapStateToProps = (state, ownProps) => {
    return {
        collapsed: state.collapsed
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

const ToggleSider = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sider)

export default ToggleSider;