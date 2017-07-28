import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SiderMenu = ({match}) => {

    let selectedKey = "directory";
    if (match) {
        selectedKey = match.params.code;
    }

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]} selectedKeys={[selectedKey]}>
            <Menu.Item key="directory">
                <Link to='/horde/directory'>
                    <Icon type="database" />
                    <span className="nav-text">Directory</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="map">
                <Link to='/horde/map'>
                    <Icon type="global" />
                    <span className="nav-text">Map</span>
                </Link>
            </Menu.Item>
        </Menu>
    );
}

export default withRouter(connect()(SiderMenu));