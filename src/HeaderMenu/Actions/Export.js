import useStore from "../../store.tsx";

export default function Export() {

  // is there a way to export and recompile the website as a static page?

  // let saveObj = useStore((state) => state.toObject)
  let saveObj = useStore.getState().toObject();
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saveObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  // eslint-disable-next-line no-useless-concat
  downloadAnchorNode.setAttribute("download", 'export' + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}