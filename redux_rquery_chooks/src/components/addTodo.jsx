import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

const AddTodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const addToDoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };
  return (
    <form onSubmit={addToDoHandler}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
