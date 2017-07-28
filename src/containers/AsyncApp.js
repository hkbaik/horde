import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import ToggleSider from './ToggleSider';
import ToggleSiderIcon from './ToggleSiderIcon';
import { updateWindowHeight } from '../actions';
import { connect } from 'react-redux';
// import logo from '../logo.svg';
import '../App.css';
import { toggleSider } from '../actions';
import { fetchDirectoryIfNeeded } from '../actions/directory';
import { Route, Redirect } from 'react-router-dom';
import DirectoryOverview from './DirectoryOverview';
import NodeViewWrapper from './NodeViewWrapper';
import ParentView from './ParentView';
import SiderMenu from './SiderMenu';
import TreemapOverview from './TreemapOverview';


const { Header, Content } = Layout;

class AsyncApp extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        const { dispatch } = this.props;
        dispatch(fetchDirectoryIfNeeded());
        dispatch(toggleSider());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = (e) => {
        const { dispatch } = this.props;
        dispatch(updateWindowHeight(window.innerHeight));
    }

    render() {
        const { windowHeight } = this.props;
        const minHeight = windowHeight - 115;
        
        return ( <Layout id="orc-layout">
                    <ToggleSider trigger={null}
                    collapsible
                    >
                        <div className="logo" />
                        <Route path='/horde/:code'>
                            <SiderMenu />
                        </Route>
                    </ToggleSider>
                    <Layout>
                        <Header id="orc-header" style={{ background: '#fff', padding: 0 }}>
                            <Row>
                                <Col span={2}>
                                    <ToggleSiderIcon className="trigger"/>
                                </Col>
                            </Row>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: minHeight }}>
                            <Route exact path='/horde' render={() => (
                                <Redirect to='/horde/directory' />
                            )} />
                            <Route exact path='/horde/directory' component={DirectoryOverview} />
                            <Route exact path='/horde/map' component={TreemapOverview}/>
                            <Route path='/horde/node/:nodeId' component={NodeViewWrapper} />
                            <Route path='/horde/parent/:xpub' component={ParentView} />
                        </Content>
                    </Layout>
                </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        windowHeight: state.windowHeight
    }
}

export default connect(mapStateToProps)(AsyncApp);