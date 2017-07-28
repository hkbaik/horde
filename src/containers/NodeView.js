import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, Row, Col, Button, Tooltip } from 'antd';
import StoragePieChart from '../components/StoragePieChart';
import { Link } from 'react-router-dom';
import bytes from 'bytes';
import { previousItem, nextItem } from '../utils';
import { push } from 'react-router-redux';

const ButtonGroup = Button.Group;

class NodeView extends React.Component {

    constructor(props){
        super(props);

        this.showPreviousNode = this.showPreviousNode.bind(this);
        this.showNextNode = this.showNextNode.bind(this);
    }

    showPreviousNode() {
        const { dispatch, prev } = this.props;
        dispatch(push('/node/'+prev));
    }

    showNextNode() {
        const { dispatch, next } = this.props;
        dispatch(push('/node/'+next));
    }

    render() {
        // console.log(this.props);
        const { nodeId, nav, xpub, index, timestamp, allocated, available, protocol, hostname, port, agent } = this.props;
        const pieData = [
            {name: 'Used', value: allocated - available},
            {name: 'Available', value: available}
        ]
        return (
            <div>
                <Card title={<h2>{`${protocol}//${hostname}:${port}`}</h2>} extra={
                    nav ? (
                        <ButtonGroup>
                            <Tooltip placement="topLeft" title="Previous Node">
                                <Button icon='left' onClick={this.showPreviousNode}/>
                            </Tooltip>
                            <Tooltip placement="topRight" title="Next Node">
                                <Button icon='right' onClick={this.showNextNode}/>
                            </Tooltip>
                        </ButtonGroup>) : <div /> }>
                    <Row className="orc-row" gutter={24}>
                        <Col span={6}>
                            <StoragePieChart data={pieData}/>
                        </Col>
                        <Col span={16}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='orc-label'>Node ID :</td>
                                        <td><Link to={'/node/'+nodeId}>{nodeId}</Link></td>
                                    </tr>
                                    <tr>
                                        <td className='orc-label'>Shared Identity :</td>
                                        <td><Link to={'/parent/'+xpub}>{xpub}</Link></td>
                                    </tr>
                                    <tr>
                                        <td className='orc-label'>Derivation Index :</td>
                                        <td>{index}</td>
                                    </tr>
                                    <tr>
                                        <td className='orc-label'>Timestamp :</td>
                                        <td>{new Date(timestamp).toUTCString()}</td>
                                    </tr>
                                    <tr>
                                        <td className='orc-label'>Allocated :</td>
                                        <td>{bytes(allocated)}</td>
                                    </tr>
                                    <tr>
                                        <td className='orc-label'>Available :</td>
                                        <td>{bytes(available)}</td>
                                    </tr>
                                    <tr>
                                        <td className='orc-label'>Agent :</td>
                                        <td>{agent}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const nodeId = ownProps.nodeId;
    const nav = ownProps.nav ? true : false;
    const found = _.findIndex(state.directory.storages, storage => storage.contact[0] === nodeId );
    if(found === -1) {
        return {};
    } else {
        const prev = state.directory.storages[previousItem(found, state.directory.storages.length)].contact[0];
        const next = state.directory.storages[nextItem(found, state.directory.storages.length)].contact[0];
        const node = state.directory.storages[found];
        return {
            nodeId: nodeId,
            nav: nav,
            allocated: node.capacity.allocated,
            available: node.capacity.available,
            timestamp: node.timestamp,
            agent: node.contact[1].agent,
            hostname: node.contact[1].hostname,
            index: node.contact[1].index,
            port: node.contact[1].port,
            protocol: node.contact[1].protocol,
            xpub: node.contact[1].xpub,
            prev: prev,
            next: next
        };
    }
}

export default connect(mapStateToProps)(NodeView);