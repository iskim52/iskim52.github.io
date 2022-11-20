import useStore from "../../store.tsx"

export default function NewFile() {
  //add are you sure panel
  useStore.getState().deleteEverything();
  useStore.setState({currentid:0})
}