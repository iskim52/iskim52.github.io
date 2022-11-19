import React, {useState} from 'react';
import { Handle , Position} from 'reactflow';
// import EdiText from 'react-editext'
import '../css/basenode.css';
import { Resizable } from "re-resizable";


function BaseNode(data, isConnectable){
	// had to put a stupid hack in so that the input box would scale with resize
	try{
		let inputBoxHack = document.querySelector("#root > div > div > div > div.react-flow__renderer > div.react-flow__viewport.react-flow__container > div.react-flow__nodes > div.react-flow__node.react-flow__node-graphNode.nopan.selected.selectable > div > div.wrapper.gradient > div > div > div.styles-module_Editext__main_container__2azCD > div")
		inputBoxHack.style.width = '100%';
	} catch (e) {}

	const [value, setValue] = useState(data.data.label);
	const [height, setHeight] = useState(150);
  const [width, setWidth] = useState(300);
  const onResizeStop = (e, direction, ref, d) => {
    setHeight((prev) => prev + d.height);
    setWidth((prev) => prev + d.width);
		// console.log('width: ', width+d.width+'px')
		// console.log('inputBox: ', inputBoxHack)
	};


  return (
		<>
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
							<textarea value={value} onChange={(e) => {setValue(e.target.value); data.data.label = e.target.value}} />
							{/* <EdiText
								type='textarea'
								value={data.data.label}
								editOnViewClick={true}
								hideIcons={true}
								saveButtonContent="✔️"
								saveButtonClassName='node-edit-save'
								cancelButtonContent="❌"
								cancelButtonClassName='node-edit-cancel'
								editButtonClassName="edit-button"
								showButtonsOnHover
								editButtonContent="✏️"
								// submitOnUnfocus
								startEditingonFocus
								// mainContainerClassName='mainEditContainer'
								buttonsAlign='after'
								onSave={(val) => {data.data.label = val}}
							/> */}
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
    </>
  );
};

export default BaseNode;