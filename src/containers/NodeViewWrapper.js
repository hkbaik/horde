import React from 'react';
import { connect } from 'react-redux';
import NodeView from './NodeView';

const NodeViewWrapper = ({nodeId}) => {
    return (
        <div>
            <h2>Node View</h2>
            <br/>
            <NodeView nodeId={nodeId} nav={true}/>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    const nodeId = ownProps.match.params.nodeId;
    return {
        nodeId: nodeId
    }
}

export default connect(mapStateToProps)(NodeViewWrapper);