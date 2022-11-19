import React, { 
  useState, 
  // useEffect, 
  useRef, 
  useCallback, 
  useEffect} from 'react';
import ReactFlow, {
  // ReactFlowProvider,
  addEdge,
  // useNodesState,
  // useEdgesState,
  Controls,
  useReactFlow,
} from 'reactflow';

import 'reactflow/dist/style.css';
import TurboEdge from './TurboEdge.tsx';
import BaseGraphNode from './BaseGraphNode/BaseGraphNode';
import ContextMenu from './ContextMenu/ContextMenu';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import './index.css';


const nodeTypes = {
    graphNode: BaseGraphNode,
  };
const edgeTypes = {
	turbo: TurboEdge,
};
const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
};

const defaultFitView = {
  zoom: 1,
}

let id;
const getId = () => `${id++}`;

const DnDFlow = ({setDisplayView, setGraph, setStarterNode, nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, setRfPass, rfPass}) => {

  id = nodes.length;
  

  //set states
  const { project } = useReactFlow();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  // setRfPass(useReactFlow());
  
  //sets edges on connect
  const onConnect = useCallback((params) => {
    setEdges((els) => addEdge(params, els));
  },[setEdges]);

  //Curent node you're starting from to connect to end node
  const connectingNodeId = useRef(null);
  
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);


  //zoomscale needed so that new nodes drop in the right place despite zoom level
  let zoomScale = useRef(1);
  const onMoveEnd = useCallback((event, viewport) => {
    // console.log(viewport)
    zoomScale.current = viewport.zoom;
  }, [zoomScale])

  //Drop new node on drag from handler
  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');
      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = `${getId()}`;
        const newNode = {
          id,
          type:'graphNode',
          // we are removing the half of the node width (75) to center the new node
          position: project({x: event.clientX - (150*zoomScale.current) - left, y: event.clientY - top}),
          data: { label: `Node ${id}` },
        };
        
        // i have to somehow find a way to get the source node positioning in order to figure out which handlers to use
        let prevNode = nodes[connectingNodeId.current];
        let xDiff = prevNode.position.x - newNode.position.x;
        let yDiff = prevNode.position.y - newNode.position.y;
        // console.log('xDiff: ', xDiff, 'yDiff: ', yDiff);
        // check to see which direction the node is farther in, horizontal or vertical
        // Horizontal handlers
        let sourceDirection;
        let targetDirection;
        let srcNode;
        let dstNode;
        if (Math.abs(xDiff) >= Math.abs(yDiff) ){
          // to the left
          if (xDiff <= 0) {
            srcNode = connectingNodeId.current;
            dstNode = id;
            sourceDirection = 'right';
            targetDirection = 'left';
          } 
          // to the right - regular
          else {
            srcNode = id;
            dstNode = connectingNodeId.current;
            sourceDirection = 'right';
            targetDirection = 'left';
          }
        } 
        // Vertical Handlers
        else{
          // to the bottom
          if (yDiff <= 0) {
            srcNode = connectingNodeId.current;
            dstNode = id;
            sourceDirection = 'bottom';
            targetDirection = 'top';
          } 
          // to the top
          else {
            srcNode = id;
            dstNode = connectingNodeId.current;
            sourceDirection = 'bottom';
            targetDirection = 'top';
          }
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat({ 
          id, 
          source: srcNode, 
          target: dstNode , 
          sourceHandle:sourceDirection, 
          targetHandle:targetDirection}));

      }
    },
    [project, setEdges, setNodes, nodes, zoomScale]
  );

  //dragover function
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  //drop function
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        position,
        data: { label: `${type} node` },
        type: 'graphNode',
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <>
      <header className='headerClass'>
        <HeaderMenu 
          inst={rfPass}
          setDisplayView={setDisplayView}
          setGraph={setGraph}
        />
      </header>
      <div className="dndflow">
        {/* <ReactFlowProvider> */}
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            deleteKeyCode = {['Delete', 'Backspace']}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onMoveEnd={onMoveEnd}
            fitViewOptions={defaultFitView}
            fitView
            minZoom = {.2}
            nodeTypes={nodeTypes}
						edgeTypes={edgeTypes}
      			defaultEdgeOptions={defaultEdgeOptions}
          >
        	<Controls />

					<svg>
						<defs>
							<linearGradient id="edge-gradient">
								<stop offset="0%" stopColor="#ae53ba" />
								<stop offset="100%" stopColor="#2a8af6" />
							</linearGradient>

							<marker
								id="edge-circle"
								viewBox="-5 -5 10 10"
								refX="0"
								refY="0"
								markerUnits="strokeWidth"
								markerWidth="10"
								markerHeight="10"
								orient="auto"
							>
							</marker>
						</defs>
					</svg>
          </ReactFlow>
        </div>    
      </div>
      <ContextMenu 
        inst={rfPass}
        nodes={nodes}
        setStarterNode = {setStarterNode}
      />
    </>

  );
};

export default DnDFlow;
