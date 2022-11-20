import create from "zustand"
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow"
import produce from 'immer';
import initialNodes from "./InitialData/nodes"
import initialEdges from './InitialData/edges';

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  currentid: initialNodes.length,
  clickednode: null,



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
    console.log('callback from pane click')
    set({
      clickednode:null
    })
  },
  setClickedNode: (node) => {
    set({
      clickednode: node
    })
  },
  getClickedNode:() => {
    return get().clickednode
  },
  setDoubleClickedNode:(node) => {
    set((state) => ({clickednode:node}));
  },

  onNodesChange: changes => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    })
  },
  onEdgesChange: changes => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    })
  },
  onConnect: connection => {
    set({
      edges: addEdge(connection, get().edges)
    })
  },

  addNode: node => {
    set({
      nodes: get().nodes.concat(node)
    })
  },
  setNodes: (nodes) => set(() => ({nodes: nodes}), true),
  getNode: nodeid => {
    return get().nodes.find(node => node.id === nodeid)
  },
  addEdge: edge => {
    set({
      edges: addEdge(edge, get().edges)
    })
  },
  getEdge: edgeid => {
    return get().edges.find(edge => edge.id === edgeid)
  },
  setNodeHtml: (node, htmlString) => {
    set(produce((state, State) => {
      const index = state.nodes.findIndex(nodes => nodes.id === node.id);
      if (index !== -1) state.nodes[index].data.htmlData = htmlString
    }))
  },

  deleteEverything: (state) => {
    set({
      nodes: [],
      edges: []
    });
  },
  deleteElements: (elements: { nodes: any[]; edges: any[]; }) => {
    // if you remove a node with no edges; it removes all edges
    let delEdges = []
    if (elements.nodes[0] !== null){
      for (let i=0; i < elements.nodes.length; i++) {
        delEdges = delEdges.concat(
          get().edges.filter((edge: { source: string; target: string; }) =>
            String(elements.nodes[i]) === edge.source ||
            String(elements.nodes[i]) === edge.target
          ).map((edge: { id: any; }) => edge.id)
        )
      }
      if (elements.edges[0] === null){
        elements.edges = (delEdges.length === 0 ? [null] : delEdges);
      } else {
        elements.edges = elements.edges.concat(delEdges);
      }
      console.log(elements.edges)

        
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
  toObject: (state) => {
    return({
      nodes: get().nodes,
      edges: get().edges,
    })
  },
}))

export default useStore
