import { Component } from "react";
import useStore from "../store";

//style absolute style location
import '../css/nodeedit.css'
import '../css/basenode.css';

export default function NodeEditMenu(clickedNode) {
  if (clickedNode.clickedNode !== null) {
    return(
      <div
        id="nodeEditMenu"
        style={{
          display: 'flex',
          position: 'relative',
          width: '100%',
      }}>
        <div className="nemContainer">
          <div className="nemRow"> 
            <div className="nemitem">Node ID: {clickedNode.clickedNode}</div>
            <div className="nemitem">Font Dropdown</div>
            <div className="nemitem">- [ ] +</div>
            <div className="nemitem">B</div>
            <div className="nemitem">I</div>
            <div className="nemitem">I</div>
            <div className="nemitem">A</div>
            <div className="nemitem">Insert Image</div>
            <div className="nemitem">Hyperlink</div>
            <div className="nemitem">Background Color</div>
          </div>
        </div>
      </div>
    )
  }
}
