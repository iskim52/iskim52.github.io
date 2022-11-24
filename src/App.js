//imports from libraries
import { 
  useState, 
} from 'react';
import {
  ReactFlowProvider,
} from 'reactflow';

//imports from files
import Flow from './Flow';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import WorkFlowView from './WorkFlowView/WorkflowView';
import ContextMenu from './ContextMenu/ContextMenu';
import NodeEditMenu from './NodeEditMenu/NodeEditMenu';
import useStore from './store.tsx'

const App = () => {
  const[displayView, setDisplayView] = useState('Graph');
  const[starterNode, setStarterNode] = useState(null);
  const[clickedNode, setClickedNode] = useState(null)
  const {headerTheme} = useStore();
  
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
        <WorkFlowView starterNode={starterNode} />
        <ContextMenu setStarterNode = {setStarterNode} />
      </div>
    )
  }

};

export default App;
