import React, { useState } from 'react';
import useStore from '../store.tsx';
import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';

export default function NodeBackground() {
  const [selectedOption, ] = useState(null);
  const {getNodeBG, clickednode, setNodeBG} = useStore();

  const [backgroundColor, setBackgroundColor] = useState('black')
  const [displayPicker, setDisplayPicker] = useState(false);

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  function dropColorPicker(evt) {
    setDisplayPicker(true)
  }
  function closeColorPicker(evt) {
    setDisplayPicker(false)
  }
  function handleChange(evt) {
    setNodeBG(clickednode, evt.hex)
    // console.log(getNode(clickednode))
  }


  return (
    <div>
    <div onClick={dropColorPicker}>
      Background Color
    </div>
    
    { displayPicker ? 
      <div style = {styles.popover}> 
        <div style={ styles.cover } onClick={ closeColorPicker }/>
        <ChromePicker color={ getNodeBG(clickednode) } onChange={handleChange}/>
      </div>  
    
      : null}
    </div>
  )

}