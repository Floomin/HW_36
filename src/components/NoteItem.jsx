import PropTypes from "prop-types";

const NoteItem = ({ note, onDelete }) => {
  return (
    <div className="note-item">
      <p>{note}</p>
      <button onClick={onDelete}>Удалить</button>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteItem;
