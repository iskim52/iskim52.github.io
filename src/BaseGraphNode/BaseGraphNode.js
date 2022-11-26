import React, {useState} from 'react';
import { Handle , Position} from 'reactflow';
import { Resizable } from "re-resizable";
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from "sanitize-html";

import useStore from '../store.tsx';

function BaseNode(data, isConnectable){
	const { setNodeHtml , getNodeHtml, setNodeSize, getNodeSize, headerTheme, gradientOn} = useStore();
	// had to put a stupid hack in so that the input box would scale with resize
	try{
		let inputBoxHack = document.querySelector("#root > div > div > div > div.react-flow__renderer > div.react-flow__viewport.react-flow__container > div.react-flow__nodes > div.react-flow__node.react-flow__node-graphNode.nopan.selected.selectable > div > div.wrapper.gradient > div > div > div.styles-module_Editext__main_container__2azCD > div")
		inputBoxHack.style.width = '100%';
	} catch (e) {}

	const onResizeStop = (e, direction, ref, d) => {
		let prev = getNodeSize(data.id)
		setNodeSize(data, {height: prev.height + d.height, width: prev.width+ d.width})
	};
  const handleChange = evt => {
		//fucking took me 9 years to figure out that 
		//i need to send the entire node instead of just id
		setNodeHtml(data, evt.target.value); 
  };
  // const sanitizeConf = {
  //   allowedTags: ["div", "b", "br", "i", "em", "strong", "a", "p", "h1"],
  //   allowedAttributes: { a: ["href"], div:["style"] }
  // };
	const sanitize = () => {
		// setNodeHtml(data, sanitizeHtml(getNodeHtml(data.id), sanitizeConf))
		setNodeHtml(data, getNodeHtml(data.id))
  };
	
	//if node is doubleclicked - enter edit mode
	let clicked = false;
	const {clickednode} = useStore();
	if (data.id === clickednode) {
		clicked = true;
	}
  return (
		// add / remove nodrag on double click
		<div className={clicked ? "nodrag" : ""}>
			<Resizable
				// size={{ width, height }}
				size={getNodeSize(data.id)}
				onResizeStop={onResizeStop}
				enable= {{
					bottomRight:true
				}}
				handleClasses={{
					top: "nodrag",
					right: "nodrag",
					bottom: "nodrag",
					left: "nodrag",
					topRight: "nodrag",
					bottomRight: "nodrag",
					bottomLeft: "nodrag",
					topLeft: "nodrag"
				}}
			>
				<div className={"node-box-shadow-" + headerTheme + " wrapper gradient-"+ headerTheme +'-'+gradientOn}>
					<div className={"inner " + headerTheme}>
						<div className="body">
							<Handle
								type="target"
								position={Position.Top}
								id='top'
								isConnectable={isConnectable}
								style={{left: '50%'}}
							/> 
							<Handle
								type="target"
								position={Position.Left}
								id='left'
								isConnectable={isConnectable}
							/>
							<ContentEditable 
								className={"contentEditable-"+headerTheme}
								// className={"contentEditable"}
								html={getNodeHtml(data.id)}
								onChange={handleChange}
								onBlur={sanitize}
								disabled={clicked ? false : true}
							/>
							{/* old variations of attempted editing content in box - missing very first version with some box that had checkmarks */}
							{/* <EditContent data={data} disabled={clicked ? false : true}/> */}
							{/* <EditableContent /> */}
							{/* <textarea value={value} onChange={(e) => {setValue(e.target.value); data.data.label = e.target.value}} /> */}
							<Handle
								type="source"
								position={Position.Right}
								id='right'
								isConnectable={isConnectable}
							/>
							<Handle
								type="source"
								position={Position.Bottom}
								id='bottom'
								isConnectable={isConnectable}
							/> 
						</div>
					</div>
				</div>
			</Resizable>
    </div>
  );
};

export default BaseNode;