import React, { 
  useState, 
  useRef, 
  useCallback, 
} from 'react';
import ReactFlow, {
  Controls,
  useReactFlow,
  Background,
} from 'reactflow';

import BaseGraphNode from './BaseGraphNode/BaseGraphNode';
import useStore from './store.tsx';
import TurboEdge from './BaseGraphNode/TurboEdge.tsx';

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


const Flow = () => {
  const graphStore = useStore.getState();
  const { 
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    addEdge,
    setDoubleClickedNode,
    clickednode,
    headerTheme,
  } = useStore();

  //set states
  const { project } = useReactFlow();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const reactFlowWrapper = useRef(null);
  
  //zoomscale needed so that new nodes drop in the right place despite zoom level
  let zoomScale = useRef(1);
  const onMoveEnd = useCallback((event, viewport) => {
    zoomScale.current = viewport.zoom;
  }, [zoomScale])

  //Curent node you're starting from to connect to end node
  const connectingNodeId = useRef(null);
  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  //Drop new node on drag from handler
  const onConnectEnd = useCallback(
    async (event) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');
      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        graphStore.increaseId()
        const id = `${graphStore.getCurrentId()}`;
        const newNode = {
          id,
          type:'graphNode',
          // we are removing the half of the node width (75) to center the new node
          position: project({x: event.clientX - (150*zoomScale.current) - left, y: event.clientY - top}),
          data: { label: `Node ${id}`, htmlData: `Node ${id}`, size: {height: 150, width:300},},
        };
        // i have to somehow find a way to get the source node positioning in order to figure out which handlers to use
        let prevNode = nodes.find(node => node.id === connectingNodeId.current);
        let xDiff = prevNode.position.x - newNode.position.x;
        let yDiff = prevNode.position.y - newNode.position.y;

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

        addNode(newNode);
        addEdge({ 
          id, 
          source: srcNode, 
          target: dstNode , 
          sourceHandle:sourceDirection, 
          targetHandle:targetDirection})
      }
    },
    [graphStore, project, nodes, addNode, addEdge]
  );

  //dragover function - can probably delete if I dont use a drag and drop menu
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  //drop function - can probably delete if I dont use a drag and drop menu
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
      graphStore.increaseId()
      const newNode = {
        id: graphStore.getCurrentId(),
        position,
        data: { label: `${type} node` , htmlData: `${type} node` , size: {height: 150, width:300},},
        type: 'graphNode',
      };

      addNode(newNode);

    },
    [reactFlowInstance, graphStore, addNode]
  );

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        className={"rfbg-"+headerTheme}
        onInit={setReactFlowInstance}

        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}

        deleteKeyCode = {['Delete', 'Backspace']}

        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        
        onDrop={onDrop}
        onDragOver={onDragOver}
        onMoveEnd={onMoveEnd}

        onNodeClick={(e, node) => (clickednode === node.id ? null : setDoubleClickedNode(null))}
        onNodeDoubleClick={(e, node) => setDoubleClickedNode(node.id)}
        onPaneClick={() => setDoubleClickedNode(null)}

        // fitViewOptions={defaultFitView}
        // fitView
        minZoom = {.2}
      >
        <Background />
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
  );
};

export default Flow;
