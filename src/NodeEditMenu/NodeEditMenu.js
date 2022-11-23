import HTMLString from 'react-html-string';

import useStore from "../store.tsx";
import FontSelector from "./fontsSelector"
import FontSize from './fontSize';


function EditButton(props) {
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
      {<HTMLString html={props.name} /> || props.cmd}
    </div>
  );
}

export default function NodeEditMenu() {
  const { clickednode } = useStore()

  if (clickednode !== null) {
    return(
      <div id="nodeEditMenu">
        <div className="nemContainer">
          <div className="nemNodeid">Node ID: {clickednode}</div>
          {/* 
          <div className="nemitem">- [ ] +</div>
          <div className="nemitem">B</div>
          <div className="nemitem">I</div>
          <div className="nemitem">U</div>
          <div className="nemitem">A</div>
          <div className="nemitem">Insert Image</div>
          <div className="nemitem">Hyperlink</div>
          <div className="nemitem">Background Color</div> */}

          <FontSelector />
          <FontSize />
          <EditButton className="nemitem" cmd="bold" name="<b>B</b>" />
          <EditButton className="nemitem" cmd="italic" name="<i> I </i>"/> 
          <EditButton className="nemitem" cmd="underline" name="<u> U </u>" />
          {/* Find Color Pickers */}
          <EditButton className="nemitem" cmd="textcolor" name="Text Color" /> 
          <EditButton className="nemitem" cmd="backgroundcolor" name="Background Color" />
          <EditButton
            className="nemitem"
            cmd="createLink"
            arg="https://github.com/lovasoa/react-contenteditable"
            name="Insert Hyperlink"
          />
          <EditButton
            className="nemitem"
            cmd="createImage"
            arg="https://image.url"
            name="Insert Image"
          />
        </div>
      </div>
    )
  } else {
    return (null)
  }
}
