import useStore from "../store";

export default function onNodeClick(e, node){
  console.log('hi')
  useStore.setState({clickednode: node})
  console.log(useStore.getState().clickednode)
  return(null)
};