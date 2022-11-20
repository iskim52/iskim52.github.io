import useStore from "../store.tsx";
import FontSelector from "./fontsSelector"
// import MyComponent from "../InitialData/fontsSelector";

//style absolute style location
import '../css/nodeedit.css'
import '../css/basenode.css';

function EditButton(props) {
  const { clickednode } = useStore()
  
  
  return (

    <div
      className={props.className}
      key={props.cmd}
      onMouseDown={evt => {
        console.log(document.getSelection())
        evt.preventDefault(); // Avoids loosing focus from the editable area
        
        // Apparently this is deprecrecated but they haven't pushed any other 
        // replacements and the world will end up in WW3 is they get rid of it.
        document.execCommand(props.cmd, false, props.arg); 
        // needs to update store with new html
        
      }}
    >
      {props.name || props.cmd}
    </div>
  );
}

export default function NodeEditMenu() {
  const { clickednode } = useStore()

  if (clickednode !== null) {
    return(
      <div
        id="nodeEditMenu"
        // style={{
        //   display: 'flex',
        //   position: 'relative',
        //   width: '100%',
        // }}
        >

        <div className="nemContainer">
          <div className="nemNodeid">Node ID: {clickednode}</div>
          {/* <div className="nemitem">Font Dropdown</div>
          <div className="nemitem">- [ ] +</div>
          <div className="nemitem">B</div>
          <div className="nemitem">I</div>
          <div className="nemitem">U</div>
          <div className="nemitem">A</div>
          <div className="nemitem">Insert Image</div>
          <div className="nemitem">Hyperlink</div>
          <div className="nemitem">Background Color</div> */}

          {/* <EditButton className="nemitem" cmd="fontName" /> */}

          {/* add styling to select */}
          <FontSelector />
          <EditButton className="nemitem" cmd="italic" />
          <EditButton className="nemitem" cmd="bold" />
          <EditButton className="nemitem" cmd="formatBlock" arg="h1" name="heading" />
          <EditButton
            className="nemitem"
            cmd="createLink"
            arg="https://github.com/lovasoa/react-contenteditable"
            name="hyperlink"
          />
        </div>
      </div>
    )
  } else {
    return (null)
  }
}
