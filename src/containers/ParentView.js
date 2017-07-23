import React from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'antd';
import NodeView from './NodeView';

const parentViewReducer = (acc, node) => {
    acc.numOfNodes += 1;
    acc.totalAllocated += node.allocated;
    acc.totalAvailable += node.available;
    return acc;
}

class ParentView extends React.Component {

    render() {
        const { children } = this.props;
        let ov = {
            numOfNodes: 0,
            totalAllocated: 0,
            totalAvailable: 0
        }
        if(children) {
            ov = children.reduce(parentViewReducer, ov)
        }

        return (
            <div>
                <h2>Parent View</h2>
                <br/>
                <Card>
                    <Row className="orc-row" gutter={24}>
                        <Col span={8}>
                            <span>The number of storages: {ov.numOfNodes}</span>
                        </Col>
                        <Col span={8}>
                            <span>Total Allocated: {ov.totalAllocated}</span>
                        </Col>
                        <Col span={8}>
                            <span>Total Available: {ov.totalAvailable}</span>
                        </Col>
                    </Row>
                    { children && children.map((node)=> <div key={node.nodeId}><NodeView match={{params:{nodeId: node.nodeId}}}/><br/></div>) }
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
        return {
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