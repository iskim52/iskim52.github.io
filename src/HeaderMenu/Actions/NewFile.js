import useStore from "../../store"

export default function NewFile() {
  //add are you sure panel
  useStore.getState().deleteEverything();
}