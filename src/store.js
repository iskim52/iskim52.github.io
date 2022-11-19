import create from "zustand"
import { addEdge, applyNodeChanges, applyEdgeChanges } from "reactflow"

import initialNodes from "./InitialData/nodes"
import initialEdges from './InitialData/edges';

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  currentid: initialNodes.length,
  clickednode: null,

  // test comment
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
    console.log(get().clickednode)
  },
  getClickedNode:() => {
    return get().clickednode
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
  deleteEverything: (state) => {
    set({
      nodes: [],
      edges: []
    });
  },
  deleteElements: (elements) => {
    // If removing nodes; also removes connecting edges
    console.log(elements)
    let delEdges = []
    if (elements.nodes !== [null]){
      for (let i=0; i < elements.nodes.length; i++) {
        delEdges = delEdges.concat(
          get().edges.filter(edge =>
            String(elements.nodes[i]) === edge.source ||
            String(elements.nodes[i]) === edge.target
          ).map(edge => edge.id)
        )
      }
      if (elements.edges === [null]){
        elements.edges = delEdges;
      } else {
        elements.edges = elements.edges.concat(delEdges);
      }
        
    }
    set({
      nodes:  get().nodes.filter((node) =>  {
                return elements.nodes.some((nodeid) => {
                  return nodeid !== node.id;
                })
              }),
      edges:  get().edges.filter((edge) =>  {
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
