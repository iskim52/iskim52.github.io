import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server'
import Select from 'react-select';
import HTMLString from 'react-html-string';

import useStore from '../store.tsx';

import '../css/nodeedit.css'


const fontSize = [8,9,10,11,12,14,18,24,30,36,48,60,72,96]
const fontSizeObj = fontSize.map(fontSize => {
  return {label:fontSize, value:fontSize}
});



export default function FontSize() { 

  const [selectedOption, ] = useState(null);
  const {getNode, clickednode, setNodeHtml} = useStore();

  function selectOption(evt) {
    let node = getNode(clickednode)
    let htmlString = node.data.htmlData
    let html;

    if (node.data.htmlData.indexOf('font-size') > -1) {
      const regex = /(\d+)px/;
      html = htmlString.replace(regex, String(evt.label)+'px')
      html = <HTMLString html={html} />
    }
    else {
      html = <HTMLString html={htmlString}/>
      html = <div style={{fontSize:evt.label}}>{html}</div>
    }
    
    let htmlRepl = ReactDOMServer.renderToString(html)
    setNodeHtml(node, htmlRepl);
  }

  return(
    <Select 
    options={fontSizeObj} 
    placeholder="8"
    defaultValue={8} //set default value to selected font
    onChange={selectOption}
    // onClick={(e) => console.log(e)}
    // isSearchable={true}
    styles={{
      control: (provided, state) => ({
        ...provided,
        // borderColor: state.isFocused ? 'grey' : 'red',
      }),
      option: (provided, state) => ({
        ...provided,
        color: 'black',
        fontFamily: state.data.label,
      }),
      singleValue: (provided, state) => ({
        ...provided,
        fontFamily: state.data.label,
        width:'10vw',
        color: 'white',
      }),
      valueContainer: (provided, state) => ({
        ...provided,
        width:'5vw',
        height: '95%',
        backgroundColor: 'black',
        color:'white',
      }),
      selectContainer: (provided, state) => ({
        ...provided,
        width:'10vw',
        height: '95%',
        backgroundColor: 'black',
        color:'white',
      }),
      placeholder: (provided, state) => ({
        ...provided,
        width:'10vw',
        height: '95%',
        backgroundColor: 'black',
        color:'white',
      }),        
    }}
    />
  )
};