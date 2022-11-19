import useStore from "../../store";

export default function OpenFile() {
  useStore.getState().deleteEverything();
  // won't work cause violates hook rule
  // useStore((state) => state.deleteEverything);

  //reads file and updates store
  function readFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      //updates store with read file
      let jsonGraph = JSON.parse(contents);
      //unsure why; but if I put deleteEverything in here, it won't update correctly
      useStore.setState({nodes:jsonGraph.nodes});
      useStore.setState({edges:jsonGraph.edges});
      useStore.setState({currentid: jsonGraph.nodes.length});
    };
    reader.readAsText(file);
  }

  //run javascript to open file and read
  var inputFile = document.createElement('input')
  inputFile.setAttribute('type', 'file');
  inputFile.setAttribute('id', 'file-input');
  inputFile.style.display = 'hidden';
  document.body.appendChild(inputFile)
  document.getElementById('file-input')
  .addEventListener('change', readFile, false);
  inputFile.click();
  inputFile.remove();
}