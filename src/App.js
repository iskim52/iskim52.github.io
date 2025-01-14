//imports from libraries
import { 
  useState, 
  useEffect,
} from 'react';
import {
  ReactFlowProvider,
} from 'reactflow';

//imports from files
import Flow from './Flow';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import WorkflowView from './WorkflowView/WorkflowView.js';
import ContextMenu from './ContextMenu/ContextMenu';
import NodeEditMenu from './NodeEditMenu/NodeEditMenu';
import useStore from './store.tsx'

const App = () => {
  const[displayView, setDisplayView] = useState('Graph');
  const[starterNode, setStarterNode] = useState(null);
  const[clickedNode, setClickedNode] = useState(null)
  const {headerTheme} = useStore();

  useEffect(() => {
    document.title = 'GraphFlow';
  }, []);
  
  if (displayView === 'Graph') {
    return (
      <div className='bigwrapper'>
        <header className={'headerClass headerClass_' + headerTheme}>
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
        <header className={'headerClass headerClass_' + headerTheme}>
          <HeaderMenu setDisplayView={setDisplayView} />
        </header>
        <WorkflowView starterNode={starterNode} />
        <ContextMenu setStarterNode = {setStarterNode} />
      </div>
    )
  }

};

export default App;
