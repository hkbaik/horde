import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Table } from 'antd';
import { Link } from 'react-router-dom';
import StoragePieChart from '../components/StoragePieChart';
import bytes from 'bytes';

const totalReducer = (acc, val) => {
    acc.numOfStorages += 1;
    acc.totalAllocated += val.capacity.allocated;
    acc.totalAvailable += val.capacity.available;
    return acc;
} 

const dataSourceMapper = (storage) => {
    return Object.assign({}, {
        key: storage.contact[0],
        nodeId: storage.contact[0],
        agent: storage.contact[1].agent,
        hostname: storage.contact[1].hostname,
        index: storage.contact[1].index,
        port: storage.contact[1].port,
        protocol: storage.contact[1].protocol,
        xpub: storage.contact[1].xpub,
        allocated: storage.capacity.allocated,
        available: storage.capacity.available,
        timestamp: storage.timestamp
    });
}

const columns = [
    {
        title: 'Node ID',
        dataIndex: 'nodeId',
        key: 'nodeId',
        render: n => <Link to={'/node/'+n}>{n}</Link>
    },
    {
        title: 'Shared Identity',
        dataIndex: 'xpub',
        key: 'xpub',
        render: p => <Link to={'/parent/'+p}>{p}</Link>
    },
    {
        title: 'Allocated',
        dataIndex: 'allocated',
        key: 'allocated',
        sorter: (a, b) => a.allocated - b.allocated,
        render: s => <span>{bytes(s)}</span>
    },
    {
        title: 'Available',
        dataIndex: 'available',
        key: 'available',
        sorter: (a, b) => a.available - b.available,
        render: s => <span>{bytes(s)}</span>
    },
    {
        title: 'Last Seen',
        dataIndex: 'timestamp',
        key: 'timestamp',
        sorter: (a, b) => a.timestamp - b.timestamp,
        render: t => <span>{new Date(t).toUTCString()}</span>
    }
]

const DirectoryOverview = ({ isFetching, storages }) => {
    const ov = storages.reduce(totalReducer, {
                    numOfStorages: 0,
                    totalAllocated: 0,
                    totalAvailable: 0
                });
    const dataSource = storages.map(dataSourceMapper);

    const pieData = [
        {name: 'Used', value: ov.totalAllocated - ov.totalAvailable},
        {name: 'Available', value: ov.totalAvailable}
    ]        
   
    return (
        <div>
            { isFetching && storages.length === 0 &&
                <h2>Loading...</h2>
            }
            { storages.length > 0 &&
                <h2>Overview</h2>
            }
            { storages.length > 0 &&
                <div>
                    <Row className="orc-row" gutter={24}>
                        <Col span={8}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='orc-label'>Storage Nodes Online :</td>
                                        <td>{ov.numOfStorages}</td>
                                        <td className='orc-label'>Storage Allocated :</td>
                                        <td>{bytes(ov.totalAllocated)}</td>
                                        <td className='orc-label'>Storage Available :</td>
                                        <td>{bytes(ov.totalAvailable)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6}>
                                            <StoragePieChart data={pieData}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                    <Table dataSource={dataSource} columns={columns} size={'middle'} />
                </div>
            }
        </div>
    );
}

DirectoryOverview.PropTypes = {
    isFetching: PropTypes.bool.isRequired,
    storages: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.directory.isFetching,
        storages: state.directory.storages
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DirectoryOverview);