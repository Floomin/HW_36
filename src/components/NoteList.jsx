import { Component } from "react";
import PropTypes from "prop-types";

class NoteList extends Component {
  render() {
    return <div className="note-list">{this.props.children}</div>;
  }
}
NoteList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoteList;
