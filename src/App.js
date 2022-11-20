//import css
import 'reactflow/dist/style.css';
import './css/index.css';

//imports from libraries
import { 
  useState, 
} from 'react';
import {
  ReactFlowProvider,
} from 'reactflow';

//imports from files
import HeaderMenu from './HeaderMenu/HeaderMenu';
import WorkFlowView from './WorkFlowView/WorkflowView';
import Flow from './Flow';
import ContextMenu from './ContextMenu/ContextMenu';
import NodeEditMenu from './NodeEditMenu/NodeEditMenu';

const App = () => {
  const[displayView, setDisplayView] = useState('Graph');
  const[starterNode, setStarterNode] = useState(null);
  const[clickedNode, setClickedNode] = useState(null)
  
  if (displayView === 'Graph') {
    return (
      <div className='bigwrapper'>
        <header className='headerClass'>
          <HeaderMenu setDisplayView={setDisplayView} />
        </header>
        <NodeEditMenu clickedNode={clickedNode} />
        <ReactFlowProvider>
          <Flow setClickedNode={setClickedNode} />
        
        </ReactFlowProvider>
        <ContextMenu setStarterNode = {setStarterNode} />
      </div>
    )
  }
  else if (displayView === 'Workflow') {
    return(
      <div className='bigwrapper'>
        <header className='headerClass'>
          <HeaderMenu setDisplayView={setDisplayView} />
        </header>
        <WorkFlowView starterNode={starterNode} />
        <ContextMenu setStarterNode = {setStarterNode} />
      </div>
    )
  }

};

export default App;
