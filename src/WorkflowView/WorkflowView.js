import React, { 
	Component } from 'react';
import WorkflowComponent from './WorkflowComponent';

class WorkflowView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			starterNode: props.starterNode
		}
	}

	render() {
		// let graph = this.state.graph;
		if (!this.state.starterNode) {
			return (
				<div className='workflow-wrapper'>
					<div style={{fontSize: '4vh', padding:'20px'}}>
						<div><b>Set Starter Node: </b></div>
							Right Click {'>>'} Set Starter Node
					</div>
				</div>
			)
		}
		else {
			return (
				<div className='workflow-wrapper'>
					<WorkflowComponent currentNode={this.state.starterNode}/>
				</div>
			)
		}

	}
}
export default WorkflowView;