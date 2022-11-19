import { Component } from "react";
import useStore from "../store";
import '../css/workflow.css'


export default class WorkflowComponent extends Component {
  constructor(props) {
    super(props)
    // console.log('From WorkflowComponent: props:',props)
    this.state = {
      previousNode: null,
      currentNode:props.currentNode,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (clickedNode) => {
    this.setState({
      previousNode: this.state.currentNode,
      currentNode: clickedNode
    })
  }

  render() {

    let currentNodeData = 
      useStore.getState().nodes.find(node => 
        String(this.state.currentNode) === node.id
      );
    let currentEdges =
    useStore.getState().edges.filter(edge =>
        String(this.state.currentNode) === edge.source ||
        String(this.state.currentNode) === edge.target
      );
    let sourceEdges = currentEdges.map(edge => edge.source);
    let targetEdges = currentEdges.map(edge => edge.target);
    let edgeSet = new Set(sourceEdges.concat(targetEdges));
    edgeSet.delete(this.state.currentNode)
    edgeSet.delete(this.state.previousNode)
    let edgeNodeList = 
        useStore.getState().nodes.filter(node => 
        edgeSet.has(node.id)  
      )
    let edgeNodeHTML = edgeNodeList.map((node) =>
        <div onClick={() => this.handleClick(node.id)} className="edgeNode" key={node.id}> {node.data.label} </div>
    );

    return(
      <div>
        <div 
          className="currentNode"
          nodeid={currentNodeData.id}
        >
          {currentNodeData.data.label}
        </div>
        {edgeNodeHTML}
      </div>
    )
  }

}