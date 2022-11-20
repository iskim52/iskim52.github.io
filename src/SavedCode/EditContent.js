import React, {Component} from "react";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import useStore from "../store.tsx";

export default class EditContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: props.data.data.htmlData,
      editable: true,
      disabled: props.disabled,
      data: props.data,
    };
  }
  handleChange = evt => {
    console.log('are you triggering')
    // this.setState({ html: evt.target.value });
    // console.log(this.state)
    // const {clickednode, setNodeHtml} = useStore();
    // setNodeHtml(clickednode, evt.target.value)
    // console.log(useStore.getState())
  };

  sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
    allowedAttributes: { a: ["href"] }
  };

  sanitize = () => {
    this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
  };

  render = () => {
    let clicked = false;
    const clickednode = useStore.getState().clickednode;
    if (this.state.data.id === clickednode) {
      clicked = true;
    }

    return (
      <div>
        <ContentEditable
          className="editable"
          tagName="pre"
          html={this.state.html} // innerHTML of the editable div
          disabled={clicked ? false : true} // use true to disable edition
          onChange={this.handleChange} // handle innerHTML change
          onBlur={this.sanitize}
        />
      </div>
    );
  };
}
