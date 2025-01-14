//imports from libraries
import { useState, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';

//imports from files
import Flow from './Flow';
import WorkflowView from './WorkflowView/WorkflowView.js';
import useStore from './store.tsx'


  // if has starter node, nodes, and edges
  // then render
      // this isn't the only thing that required, we have to set the state of the objects correctly.
    // this is done by initializing the store
    // and loading the store with the nodes, edges and starter node.

const Viewer = () => {
  const[graphData, setGraphData] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const[clickedNode, setClickedNode] = useState(null)

  // useEffect for loading saved graph data from a flat file.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./graph.json");
        const data = await response.json();

        useStore.getState().initialize(data);
        // this is implemented in the store to export during save, however there are 
        // other parts of the application that don't currently set the state that way yet.
        // manually set this since the save hasnt been updated to save this as part of the json
        useStore.getState().setStarterNode(14);
        setIsInitialized(true);

      } catch (error) {
        console.error("Error loading graph data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // implement custom window titles
    document.title = 'Custom Render';
  }, []);


  if (!isInitialized) {
    return <div> Loading...</div>
  } 

  // implement back one node and start functionality.
  // how do I center on the starter node and move as I click through options
  return (
  <div className='bigwrapper'>
    <WorkflowView starterNode={useStore.getState().getStarterNode()} />
    <ReactFlowProvider>
      <Flow setClickedNode={setClickedNode} />
    </ReactFlowProvider>
  </div>
  

  )
  // implement graph view functionality
  // implement ability to hide graph view functionality
  // implement ability to hide workflow view functionality.



};

export default Viewer;