//refactored tsx to reflect reactflow zustand paradigm with immer impl

import create from 'zustand';
import produce from 'immer';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import initialNodes from "./InitialData/nodes"
import initialEdges from './InitialData/edges';

// utilized within react.FC to pass initial typing to react component
// create from zustand is a react.FC
type RFState = {
  nodes: Node[];
  edges: Edge[];
  currentid: number,
  clickednode: number | null,
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  gradientOn: string;
  headerTheme: string;
};

const useStore = create<RFState>((set,get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  currentid: initialNodes.length,
  clickednode: null,
  gradientOn: 'on',
  headerTheme: 'dark',

  setGradientOn: (status: any) => {
    set({
      gradientOn: status
    })
  },
  setHeaderTheme: (style: any) => {
    set({
      headerTheme: style
    })
  },  

  increaseId: () => {
    set({
      currentid: get().currentid + 1
    })
    return get().currentid;
  },
  getCurrentId: () => {
    return get().currentid
  },

  onPaneClick: () => {
    set({
      clickednode:null
    })
  },
  setClickedNode: (node: number) => {
    set({
      clickednode: node
    })
  },
  getClickedNode:() => {
    return get().clickednode
  },
  setDoubleClickedNode:(node: number) => {
    set(() => ({clickednode:node}));
  },

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    })
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    })
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges)
    })
  },

  addNode: (node: any) => {
    set({
      nodes: get().nodes.concat(node)
    })
  },
  setNodes: (nodes: any) => set(() => ({nodes: nodes}), true),
  getNode: (nodeid: string) => {
    return get().nodes.find(node => node.id === nodeid)
  },
  addEdge: (edge: any) => { // should I replacethe below with the same type of code from onEdgeChange
    set({
      edges: addEdge(edge, get().edges)
    })
  },
  getEdge: (edgeid: string) => {
    return get().edges.find(edge => edge.id === edgeid)
  },
  setNodeHtml: (node: { id: any; }, htmlString: string) => {
    const index = get().nodes.findIndex(nodes => nodes.id === node.id);
    if (index !== -1)
      set(produce((state) => {
        state.nodes[index].data.htmlData = htmlString
      }), true)
  },
  getNodeHtml: (nodeid: string) => {
    return get().nodes.find(node => node.id === nodeid)?.data.htmlData
  },

  deleteEverything: () => {
    set({
      nodes: [],
      edges: [],
      currentid: 0,
    });
  },
  deleteElements: (elements: { nodes: any[]; edges: any[]; }) => {
    //this could  definitely be refactored to bebetter
    let delEdges: any[] = [];
    if (elements.nodes[0] !== null){
      for (let i=0; i < elements.nodes.length; i++) {
        delEdges = 
        delEdges.concat(
          get()
          .edges
          .filter((edge: { source: string; target: string; }) =>
            String(elements.nodes[i]) === edge.source ||
            String(elements.nodes[i]) === edge.target
          ).map((edge: { id: string; }) => edge.id)
        )
      }
      if (elements.edges[0] === null){
        elements.edges = (delEdges.length === 0 ? [null] : delEdges);
      } else {
        elements.edges = elements.edges.concat(delEdges);
      }
        
    }
    set({
      nodes:  get().nodes.filter((node: { id: any; }) =>  {
                return elements.nodes.some((nodeid) => {
                  return nodeid !== node.id;
                })
              }),
      edges:  get().edges.filter((edge: { id: any; }) =>  {
                return elements.edges.concat(delEdges).some((edgeid) => {
                  return edgeid !== edge.id;
                })
              }),
    });
  },
  toObject: () => {
    return({
      nodes: get().nodes,
      edges: get().edges,
    })
  },
}))

export default useStore
