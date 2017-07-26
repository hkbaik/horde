import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, Row, Col } from 'antd';
import StoragePieChart from '../components/StoragePieChart';
import { Link } from 'react-router-dom';
import bytes from 'bytes';

class NodeView extends React.Component {

    render() {
        // console.log(this.props);
        const { nodeId, xpub, index, timestamp, allocated, available, protocol, hostname, port, agent } = this.props;
        const pieData = [
            {name: 'Used', value: allocated - available},
            {name: 'Available', value: available}
        ]
        return (
            <div>
                <h2>Node View</h2>
                <Card>
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
                                        <td className='orc-label'>Protocol :</td>
                                        <td>{protocol}</td>
                                    </tr>
                                    <tr>
                                        <td className='orc-label'>Host Name :</td>
                                        <td>{hostname}</td>
                                    </tr>
                                    <tr>
                                        <td className='orc-label'>Port :</td>
                                        <td>{port}</td>
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
    const nodeId = ownProps.match.params.nodeId;
    const found = _.findIndex(state.directory.storages, storage => storage.contact[0] === nodeId );
    if(found === -1) {
        return {};
    } else {
        const node = state.directory.storages[found];
        return {
            nodeId: nodeId,
            allocated: node.capacity.allocated,
            available: node.capacity.available,
            timestamp: node.timestamp,
            agent: node.contact[1].agent,
            hostname: node.contact[1].hostname,
            index: node.contact[1].index,
            port: node.contact[1].port,
            protocol: node.contact[1].protocol,
            xpub: node.contact[1].xpub
        };
    }
}

export default connect(mapStateToProps)(NodeView);