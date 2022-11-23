import React, { useTransition } from 'react';
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
import useStore from '../store.tsx';


export default function HeaderMenu(props) {
  let setDisplayView = props.setDisplayView
  // const backgroundTheme = useStore.getState().backgroundTheme;
  const {headerTheme, setHeaderTheme} = useStore();

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
          <MenuItem onClick={() => setDisplayView('Graph')}>
            Graph View
          </MenuItem>
          <MenuItem onClick={() => {
            setDisplayView('Workflow');
            }}>
            Workflow View
          </MenuItem>
          {/* <MenuItem>Node Edit View</MenuItem> */}
      </Menu>
      <Menu 
        menuButton={<MenuButton>🎨 Themes</MenuButton>}
        theming={"dark"}>
          <SubMenu label="Background Themes">
            <MenuItem value='./css/light.css' onClick={(evt) => setHeaderTheme(evt.value)}>
              Light
            </MenuItem>
            <MenuItem value='../css/headermenu/headermenu-dark.scss' onClick={() => setDisplayView('Graph')}>
              Dark
            </MenuItem>
            <MenuItem value='./css/neo.css' onClick={() => setDisplayView('Graph')}>
              Neo
            </MenuItem>
          </SubMenu>
          <SubMenu label="Node Themes">
            <MenuItem value='./css/animated.css' onClick={() => setDisplayView('Graph')}>
              Animated
            </MenuItem>
            <MenuItem value='./css/static.css' onClick={() => setDisplayView('Graph')}>
              Static
            </MenuItem>
          </SubMenu>
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


// export default class HeaderMenu extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
//       setDisplayView: props.setDisplayView,
// 		}
//   }

//   render() {
//     const backgroundTheme = useStore.getState().backgroundTheme;

//     return (
//       <div className="menuContainer">
//         <link rel="stylesheet" type="text/css" href={backgroundTheme} />
//         <Menu 
//           menuButton={<MenuButton>📁 File</MenuButton>}
//           theming={true ? "dark" : undefined}>
//             <MenuItem onClick={() => NewFile()}>
//               New File
//             </MenuItem>
//             <MenuItem onClick={() => OpenFile()}>
//               Open
//             </MenuItem>
//             <MenuItem onClick={() => SaveFile()}>
//               Save
//             </MenuItem>
//             <MenuDivider className="menuDivider" />
//             <MenuItem>Convert from Draw.io</MenuItem>
//         </Menu>
//         <Menu 
//           menuButton={<MenuButton>🖥️ Display</MenuButton>}
//           theming={true ? "dark" : undefined}>
//             <MenuItem onClick={() => this.state.setDisplayView('Graph')}>
//               Graph View
//             </MenuItem>
//             <MenuItem onClick={() => {
//               this.state.setDisplayView('Workflow');
//               }}>
//               Workflow View
//             </MenuItem>
//             {/* <MenuItem>Node Edit View</MenuItem> */}
//         </Menu>
//         <Menu 
//           menuButton={<MenuButton>🎨 Themes</MenuButton>}
//           theming={"dark"}>
//             <SubMenu label="Background Themes">
//               <MenuItem value='./css/light.css' onClick={(evt) => useStore.getState().changeBackgroundTheme(evt.value)}>
//                 Light
//               </MenuItem>
//               <MenuItem value='./css/index.css' onClick={() => this.state.setDisplayView('Graph')}>
//                 Dark
//               </MenuItem>
//               <MenuItem value='./css/neo.css' onClick={() => this.state.setDisplayView('Graph')}>
//                 Neo
//               </MenuItem>
//             </SubMenu>
//             <SubMenu label="Node Themes">
//               <MenuItem value='./css/animated.css' onClick={() => this.state.setDisplayView('Graph')}>
//                 Animated
//               </MenuItem>
//               <MenuItem value='./css/static.css' onClick={() => this.state.setDisplayView('Graph')}>
//                 Static
//               </MenuItem>
//             </SubMenu>
//         </Menu>
//         <Menu 
//           menuButton={<MenuButton><font color='red'>⁉️</font> Help</MenuButton>}
//           theming={true ? "dark" : undefined}>
//             <MenuItem>Tutorial</MenuItem>
//             <MenuItem>Contact Us</MenuItem>
//             {/* <MenuItem>Node Edit View</MenuItem> */}
//         </Menu>
//       </div>
//     )
//   };
// }
