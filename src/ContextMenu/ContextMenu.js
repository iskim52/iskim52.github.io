import React, { Component } from 'react';
import useStore from '../store.tsx';

class ContextMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xPos: "0px",
			yPos: "0px",
			showMenu: false,
			isNode: false,
			isEdge: false,
			node: null,
			edge: null,
			setStarterNode: props.setStarterNode
		}
	}

	componentDidMount() {
			document.addEventListener("click", this.handleClick);
			document.addEventListener("contextmenu", this.handleContextMenu);
	}

	componentWillUnmount() {
			document.removeEventListener("click", this.handleClick);
			document.removeEventListener("contextmenu", this.handleContextMenu);
			this.isNode = false;
	}

	handleClick = (e) => {
		// console.log(e)
		if (this.state.showMenu) 
			this.setState({ 
				showMenu: false ,
				isNode: false,
				isEdge: false,
				node: null,
				edge: null,
			});
	};

	handleContextMenu = (e) => {
		e.preventDefault();
		// location handling
		for (let i = 0; i < e.path.length; i++) {
			//checks to see if on reactflow
			
			//checks to see if on node
			if (e.path[i].tagName === 'DIV') {
				if (e.path[i].hasAttribute('data-id')) {
					this.setState({
						xPos: `${e.pageX}px`,
						yPos: `${e.pageY}px`,
						showMenu: true,
						isNode: true,
						node: e.path[i].getAttribute('data-id'),
					});
					break;
				} 
				else if (e.path[i].classList.contains('react-flow')) {
					this.setState({
						xPos: `${e.pageX}px`,
						yPos: `${e.pageY}px`,
						showMenu: true,
					})
				}
			}
			//checks to see if on edge
			else if (e.path[i].tagName === 'path') {
				if (e.path[i].hasAttribute('id')) {
					this.setState({
						xPos: `${e.pageX}px`,
						yPos: `${e.pageY}px`,
						showMenu: true,
						isEdge: true,
						edge: e.path[i].id,
					});
					break;
				}
			}
		}
	};

	addNewNode = (e) => {
		// useStore((state) => state.increaseId)
		useStore.getState().increaseId()
		const newNode = {
			id:String(useStore.getState().getCurrentId()),
			type:'graphNode',
			// have to set zoomscale and t/l bounds in store
			// we are removing the half of the node width (75) to center the new node
			position: {x: e.pageX, y: e.pageY},
			data: { label: `Node ${String(useStore.getState().getCurrentId())}`, htmlData: `Node ${String(useStore.getState().getCurrentId())}`, size: {height: 150, width:300},},
		};
		useStore.getState().addNode(newNode)
	};

	//if I add a node via right click; then delete that node; it deletes all edges
	deleteNode = (e) => {
		useStore.getState().deleteElements({nodes:[this.state.node], edges:[null]});
		this.setState({
			xPos: "0px",
			yPos: "0px",
			showMenu: false,
			isNode: false,
			isEdge: false,
			node: null,
			edge: null,
		});
	};

	//if I delete one edge, it edges all edge rn
	deleteEdge = (e) => {
		useStore.getState().deleteElements({nodes: [null], edges:[this.state.edge]})
		this.setState({
			xPos: "0px",
			yPos: "0px",
			showMenu: false,
			isNode: false,
			isEdge: false,
			node: null,
			edge: null,
		});
		// console.log(this.state.inst.deleteElements(this.state.node))
	};

	setStarterNode = (e) => {
		this.state.setStarterNode(this.state.node);	
	}

	render() {
	const { showMenu, xPos, yPos, isNode, isEdge} = this.state;

	if (showMenu)
		//context menu for nodes
		if (isNode)
			return (
				<ul
						className="contextMenu"
						style={{
						position: 'absolute',
						top: yPos,
						left: xPos,
					}}
				>
					<li onClick={this.setStarterNode}>Set Starter Node</li>
					<li onClick={this.deleteNode}>Delete</li>
					{/* <li>Add</li> */}
				</ul>
			);
		//context menu for edges
		else if (isEdge)
				return (
					<ul
						className="contextMenu"
						style={{
							position: 'absolute',
							top: yPos,
							left: xPos,
						}}
					>
						<li onClick={this.deleteEdge}>Delete</li>
						{/* <li>Add</li> */}
					</ul>
				)
		else 
				return (
					<ul
						className="contextMenu"
						style={{
							position: 'absolute',
							top: yPos,
							left: xPos,
						}}
					>
						<li onClick={this.addNewNode}>Add Node</li>
					</ul>
				)

	else return null;
	}
}
export default ContextMenu;