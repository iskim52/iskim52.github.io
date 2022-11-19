import React, {Component} from 'react';
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import "@szhsin/react-menu/dist/theme-dark.css";
import './headermenu.scss'

import NewFile from './Actions/NewFile';
import OpenFile from './Actions/OpenFile';
import SaveFile from './Actions/SaveFile';

export default class HeaderMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
      setDisplayView: props.setDisplayView,
		}
  }
  render() {
    return (
      <div className="menuContainer">
        <Menu 
          menuButton={<MenuButton>📁 File</MenuButton>}
          theming={true ? "dark" : undefined}>
            <MenuItem onClick={() => NewFile()}>
              New File
            </MenuItem>
            <MenuItem onClick={() => OpenFile()}>
              Open
            </MenuItem>
            <MenuItem onClick={() => SaveFile()}>
              Save
            </MenuItem>
            <MenuDivider className="menuDivider" />
            <MenuItem>Convert from Draw.io</MenuItem>
        </Menu>
        <Menu 
          menuButton={<MenuButton>🖥️ Display</MenuButton>}
          theming={true ? "dark" : undefined}>
            <MenuItem onClick={() => this.state.setDisplayView('Graph')}>
              Graph View
            </MenuItem>
            <MenuItem onClick={() => {
              this.state.setDisplayView('Workflow');
              }}>
              Workflow View
            </MenuItem>
            {/* <MenuItem>Node Edit View</MenuItem> */}
        </Menu>
        <Menu 
          menuButton={<MenuButton><font color='red'>⁉️</font> Help</MenuButton>}
          theming={true ? "dark" : undefined}>
            <MenuItem>Tutorial</MenuItem>
            <MenuItem>Contact Us</MenuItem>
            {/* <MenuItem>Node Edit View</MenuItem> */}
        </Menu>
      </div>
    )
  };
}
