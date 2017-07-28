import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Button, Tooltip } from 'antd';
import NodeView from './NodeView';
import bytes from 'bytes';
import { previousItem, nextItem } from '../utils';
import { push } from 'react-router-redux';

const ButtonGroup = Button.Group;

const parentViewReducer = (acc, node) => {
    acc.numOfNodes += 1;
    acc.totalAllocated += node.allocated;
    acc.totalAvailable += node.available;
    return acc;
}

class ParentView extends React.Component {

    constructor(props) {
        super(props);

        this.showPreviousParent = this.showPreviousParent.bind(this);
        this.showNextParent = this.showNextParent.bind(this);
    }

    showPreviousParent() {
        const { dispatch, prev } = this.props;
        dispatch(push('/horde/parent/'+prev));
    }

    showNextParent() {
        const { dispatch, next } = this.props;
        dispatch(push('/horde/parent/'+next));
    }

    render() {
        const { children } = this.props;
        let ov = {
            numOfNodes: 0,
            totalAllocated: 0,
            totalAvailable: 0
        }

        if(children) {
            ov = children.reduce(parentViewReducer, ov)
            ov.totalAllocated = bytes(ov.totalAllocated)
            ov.totalAvailable = bytes(ov.totalAvailable)
        }

        return (
            <div>
                <Card title={<h2>Parent View</h2>} extra={
                    <ButtonGroup>
                        <Tooltip placement="topLeft" title="Previous Shared Identity">
                            <Button icon="left" onClick={this.showPreviousParent}/>
                        </Tooltip>
                        <Tooltip placement="topRight" title="Next Shared Identity">
                            <Button icon="right" onClick={this.showNextParent}/>
                        </Tooltip>
                    </ButtonGroup>}>
                    <Row className="orc-row" gutter={24}>
                        <Col span={8}>
                            <span>Storage Nodes Online: {ov.numOfNodes}</span>
                        </Col>
                        <Col span={8}>
                            <span>Storage Allocated: {ov.totalAllocated}</span>
                        </Col>
                        <Col span={8}>
                            <span>Storage Available: {ov.totalAvailable}</span>
                        </Col>
                    </Row>
                    { children && children.map((node)=> <div key={node.nodeId}><NodeView nodeId={node.nodeId}/><br/></div>) }
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const xpub = ownProps.match.params.xpub;
    const children = state.directory.storages.filter(storage => storage.contact[1].xpub === xpub)

    if (children.length === 0) {
        return {};
    } else {
        const found = state.directory.parents.indexOf(xpub);
        const prev = state.directory.parents[previousItem(found, state.directory.parents.length)];
        const next = state.directory.parents[nextItem(found, state.directory.parents.length)];
        return {
            prev: prev,
            next: next,
            xpub: xpub,
            children: children.map(node => {
                return {
                    nodeId: node.contact[0],
                    allocated: node.capacity.allocated,
                    available: node.capacity.available,
                    timestamp: node.timestamp,
                    agent: node.contact[1].agent,
                    hostname: node.contact[1].hostname,
                    index: node.contact[1].index,
                    port: node.contact[1].port,
                    protocol: node.contact[1].protocol,
                    xpub: node.contact[1].xpub
                }
            })
        }
    }
}

export default connect(mapStateToProps)(ParentView);