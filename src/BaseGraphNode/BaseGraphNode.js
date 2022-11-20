import React, {useState} from 'react';
import { Handle , Position} from 'reactflow';

import { Resizable } from "re-resizable";
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from "sanitize-html";

import useStore from '../store.tsx';
// import useStore from '../store';
// import EditContent from '../NodeEditMenu/EditContent';

import '../css/basenode.css';

import FontSelector from '../NodeEditMenu/fontsSelector';

function BaseNode(data, isConnectable){
	// had to put a stupid hack in so that the input box would scale with resize
	try{
		let inputBoxHack = document.querySelector("#root > div > div > div > div.react-flow__renderer > div.react-flow__viewport.react-flow__container > div.react-flow__nodes > div.react-flow__node.react-flow__node-graphNode.nopan.selected.selectable > div > div.wrapper.gradient > div > div > div.styles-module_Editext__main_container__2azCD > div")
		inputBoxHack.style.width = '100%';
	} catch (e) {}

	// const [value, setValue] = useState(data.data.label);
	const [height, setHeight] = useState((data.data.size !== undefined) ? data.data.size.height : 150); // default height
  const [width, setWidth] = useState((data.data.size !== undefined) ? data.data.size.width : 300); // default width

	const onResizeStop = (e, direction, ref, d) => {
    setHeight((prev) => prev + d.height);
    setWidth((prev) => prev + d.width);
		data.data.size = {height: height, width: width}
	};
	
	// doesn't fix anything so its not the node being draggable.
	// useStore.getState().turnDraggableOff()
	// const [htmlData, setHtml] = useState(data.data.htmlData);
	// const htmlData = useRef(data.data.htmlData)
	// const handleBlur = () => {};
  const handleChange = evt => {
    data.data.htmlData = evt.target.value;
		data.data.label = evt.target.value;
  };
  const sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
    allowedAttributes: { a: ["href"] }
  };
	const sanitize = () => {
    data.data.htmlData = sanitizeHtml(data.data.htmlData, sanitizeConf);
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
				size={{ width, height }}
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
				}

				}
			>
				<div className="wrapper gradient">
					<div className="inner">
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
								className="contentEditable"
								html={data.data.htmlData}
								onChange={handleChange}
								onBlur={sanitize}
								disabled={clicked ? false : true}
							/>
							{/* <EditContent data={data} disabled={clicked ? false : true}/> */}
							{/* old variations of attempted editing content in box - missing very first version with some box that had checkmarks */}
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