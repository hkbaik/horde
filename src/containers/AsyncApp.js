import React, { Component } from 'react';
import { Layout, Menu, Icon, Tooltip, Row, Col } from 'antd';
import ToggleSider from './ToggleSider';
import ToggleSiderIcon from './ToggleSiderIcon';
import { updateWindowHeight } from '../actions';
import { connect } from 'react-redux';
// import logo from '../logo.svg';
import '../App.css';

const { Header, Content } = Layout;

class AsyncApp extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    handleResize = (e) => {
        const { dispatch } = this.props;
        dispatch(updateWindowHeight(window.innerHeight));
    }

    render() {
        const { windowHeight } = this.props;
        const minHeight = windowHeight - 115;
        const selectedKey = "directory";

        return ( <Layout id="orc-layout">
                    <ToggleSider trigger={null}
                    collapsible
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]} selectedKeys={[selectedKey]}>
                            <Menu.Item key="directory">
                                <Icon type="database" />
                                <span className="nav-text"> Directory </span>
                            </Menu.Item>
                        </Menu>
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
                            <div>Hello World</div>
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