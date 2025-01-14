import React from 'react';
import {
  Menu,
  MenuItem,
  MenuButton,
  MenuDivider,
  SubMenu,
} from '@szhsin/react-menu';

import NewFile from './Actions/NewFile';
import OpenFile from './Actions/OpenFile';
import SaveFile from './Actions/SaveFile';
import Export from './Actions/Export';
import useStore from '../store.tsx';


export default function HeaderMenu(props) {
  let setDisplayView = props.setDisplayView
  const {headerTheme, setHeaderTheme, setGradientOn, setBackgroundOn, backgroundOn} = useStore();

  return (
    <div className="menuContainer">
      <Menu 
        menuButton={<MenuButton className={"menu-btn-" + headerTheme}>📁 File</MenuButton>}
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
          <MenuItem onClick={() => SaveFile()}>
            Export as Static WebPage
          </MenuItem>
          <MenuItem>Convert from Draw.io</MenuItem>
      </Menu>
      <Menu 
        menuButton={<MenuButton className={"menu-btn-" + headerTheme}>🖥️ Display</MenuButton>}
        theming={true ? "dark" : undefined}>
          <MenuItem onClick={() => setDisplayView('Graph')}>
            Graph View
          </MenuItem>
          <MenuItem onClick={() => {
            setDisplayView('Workflow');
            }}>
            Workflow View
          </MenuItem>
          <MenuDivider className="menuDivider" />
          <MenuItem onClick={() => setBackgroundOn(!backgroundOn)}>
            Turn Background On
          </MenuItem>
      </Menu>
      <Menu 
        menuButton={<MenuButton className={"menu-btn-" + headerTheme}>🎨 Themes</MenuButton>}
        theming={"dark"}>
          <SubMenu label="Background Themes">
            <MenuItem value='light' onClick={(evt) => setHeaderTheme(evt.value)}>
              Light
            </MenuItem>
            <MenuItem value='dark' onClick={(evt) => setHeaderTheme(evt.value)}>
              Dark
            </MenuItem>
            <MenuItem value='neo' onClick={(evt) => setHeaderTheme(evt.value)}>
              Neo
            </MenuItem>
          </SubMenu>
          <SubMenu label="Node Themes">
            <MenuItem value='animated' onClick={() => setGradientOn('on')}>
              Animated
            </MenuItem>
            <MenuItem value='static' onClick={() => setGradientOn('off')}>
              Static
            </MenuItem>
          </SubMenu>
      </Menu>
      <Menu 
        menuButton={<MenuButton className={"menu-btn-" + headerTheme}><font color='red'>⁉️</font> Help</MenuButton>}
        theming={true ? "dark" : undefined}>
          <MenuItem>Tutorial</MenuItem>
          <MenuItem>Contact Us</MenuItem>
          {/* <MenuItem>Node Edit View</MenuItem> */}
      </Menu>
    </div>
  )
};