import React from "react";
import ContentEditable from "react-contenteditable";
// import sanitizeHtml from "sanitize-html";
// import "./styles.css";

export default class EditableContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: `<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`,
      editable: true
    };
  }
  handleChange = evt => {
    this.setState({ html: evt.target.value });
  };

  sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
    allowedAttributes: { a: ["href"] }
  };

  sanitize = () => {
    this.setState({ html:this.state.html });
  };

  toggleEditable = () => {
    this.setState({ editable: !this.state.editable });
  };

  render = () => {
    return (
      <div>
        <h3>editable contents</h3>
        <ContentEditable
          className="editable"
          tagName="pre"
          html={this.state.html} // innerHTML of the editable div
          disabled={!this.state.editable} // use true to disable edition
          onChange={this.handleChange} // handle innerHTML change
          onBlur={this.sanitize}
        />
        <h3>source</h3>
        <textarea
          className="editable"
          value={this.state.html}
          onChange={this.handleChange}
          onBlur={this.sanitize}
        />
        <h3>actions</h3>
        <EditButton cmd="italic" />
        <EditButton cmd="bold" />
        <EditButton cmd="formatBlock" arg="h1" name="heading" />
        <EditButton
          cmd="createLink"
          arg="https://github.com/lovasoa/react-contenteditable"
          name="hyperlink"
        />
        <button onClick={this.toggleEditable}>
          Make {this.state.editable ? "readonly" : "editable"}
        </button>
      </div>
    );
  };
}

function EditButton(props) {
  return (
    <button
      key={props.cmd}
      onMouseDown={evt => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}