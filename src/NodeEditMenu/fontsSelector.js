import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server'
import Select from 'react-select';

import useStore from '../store.tsx';

import '../css/nodeedit.css'

const fontOptions = [
  {value: "Helvetica", label: "Helvetica"},
  {value: "Arial", label: "Arial"},
  {value: "Arial Black", label: "Arial Black"},
  {value: "Verdana", label: "Verdana"},
  {value: "Tahoma", label: "Tahoma"},
  {value: "Trebuchet MS", label: "Trebuchet MS"},
  {value: "Impact", label: "Impact"},
  {value: "Gill Sans", label: "Gill Sans"},
  {value: "Times New Roman", label: "Times New Roman"},
  {value: "Georgia", label: "Georgia"},
  {value: "Palatino", label: "Palatino"},
  {value: "Baskerville", label: "Baskerville"},
  {value: "Andale Mono", label: "Andale Mono"},
  {value: "Courier", label: "Courier"},
  {value: "Lucida", label: "Lucida"},
  {value: "Monaco", label: "Monaco"},
  {value: "Bradley Hand", label: "Bradley Hand"},
  {value: "Brush Script MT", label: "Brush Script MT"},
  {value: "Luminari", label: "Luminari"},
  {value: "Comic Sans MS", label: "Comic Sans MS"}
]


export default function FontSelector() {
  const [selectedOption, setSelectedOption] = useState(null);
  const {getNode, clickednode, setNodeHtml} = useStore();

  function selectOption(evt) {
    let node = getNode(clickednode)
    let htmlString
    console.log(node.data.htmlData)
    // if font already set, replace font otherwise add font
    if (node.data.htmlData.indexOf('font-family') > -1) {
      let start = node.data.htmlData.indexOf('>') + 1
      let end = node.data.htmlData.indexOf('</div>')
      let strippedString = node.data.htmlData.slice(start,end)
      htmlString = ReactDOMServer.renderToString(<div style={{fontFamily:evt.label}}>{strippedString}</div>)
    } else {
      htmlString = ReactDOMServer.renderToString(<div style={{fontFamily:evt.label}}>{node.data.htmlData}</div>)
    }
    setNodeHtml(node, htmlString);
    console.log(useStore.getState())
  }

  return (
    <div className="selectComponent">
      <Select 
      options={fontOptions} 
      placeholder="Font:"
      defaultValue={selectedOption} //set default value to selected font
      onChange={selectOption}
      isSearchable={true}
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
          width:'10vw',
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
    </div>
  )

}