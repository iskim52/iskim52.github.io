//import css
import 'reactflow/dist/style.css';
import './index.css';

//imports from libraries
import { 
  useState, 
} from 'react';
import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';

//imports from files
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import WorkFlowView from '../WorkFlowView/WorkflowView';
import Flow from '../Flow';
import useStore from '../store';

//set initialization
const initialNodes = [
  {
    id: '0',
    type: 'graphNode',
    position: { x: 0, y: 0 },
    data: { label: 'input node' },
  },
	{
    id: '1',
    type: 'graphNode',
    position: { x: 500, y: 0 },
    data: { label: 'input node' },
  },
];
const initialEdges = [
  {
    id: '1',
    source: '0',
    target: '1',
    targetHandle: 'left'
  },
];

const App = () => {
  const[displayView, setDisplayView] = useState('Graph');
  const[graph, setGraph] = useState(null);
  const[starterNode, setStarterNode] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const rfPass = useReactFlow();
  const [rfPass, setRfPass] = useState(null);

  if (displayView === 'Graph') {
    return (
      <div className='bigwrapper'>
        {/* fix later too lazy to fix now; need to get getReactFlow state for passing to header */}
        {/* <header className='headerClass'><HeaderMenu setDisplayView={setDisplayView}/></header> */}
        <ReactFlowProvider>
          <HeaderMenu 
            inst={rfPass}
            setDisplayView={setDisplayView}
            setGraph={setGraph}
          />
          <Flow 
            setDisplayView={setDisplayView}
            setGraph={setGraph}
            setStarterNode={setStarterNode}
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            edges={edges}
            setEdges={setEdges}
            onEdgesChange={onEdgesChange}
            // setRfPass={setRfPass}
            // rfPass={rfPass}
          />
        </ReactFlowProvider>
        
        {/* <Sidebar /> */}
        {/* <Footer /> */}
      </div>
    )
  }
  else if (displayView === 'Workflow') {
    return(
      <div className='bigwrapper'>
        <header className='headerClass'>
          <HeaderMenu 
            setDisplayView={setDisplayView}
            // inst={rfPass}
          />
        </header>
        <WorkFlowView graph={graph} starterNode={starterNode} />
      </div>
    )
  }

};

export default App;
