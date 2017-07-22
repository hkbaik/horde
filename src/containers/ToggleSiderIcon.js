import { connect } from 'react-redux';
import { toggleSider } from '../actions';
import { Icon } from 'antd';

const mapStateToProps = (state, ownProps) => {
    return {
        type: state.collapsed ? 'menu-unfold' : 'menu-fold'
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(toggleSider())
        }
    }
}

const ToggleSiderIcon = connect(
    mapStateToProps,
    mapDispatchToProps
)(Icon);

export default ToggleSiderIcon;