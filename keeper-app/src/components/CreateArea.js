import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpand, setIsExpand] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setNote((preNote) => {
      return {
        ...preNote,
        [name]: value,
      };
    });
  };

  const handleSubmitNote = (event) => {
    event.preventDefault();
    props.addNote(note);
    setNote({
      title: "",
      content: "",
    });
  };
  const expand = () => {
    setIsExpand(true);
  };
  return (
    <div>
      <form>
        {
          isExpand && <input
          onChange={handleOnChange}
          name="title"
          value={note.title}
          placeholder="Title"
        /> 
        }
        <textarea
          onClick={expand}
          onChange={handleOnChange}
          name="content"
          value={note.content}
          placeholder="Take a note..."
          rows={isExpand ? 3 : 1}
        />
        <Zoom in={isExpand}>
          <Fab className="btn-add">
            <AddIcon onClick={handleSubmitNote}>Add</AddIcon>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
