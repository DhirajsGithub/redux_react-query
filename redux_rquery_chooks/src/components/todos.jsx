import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const handleDelClick = (id) => {
    dispatch(removeTodo(id));
  };
  return (
    <div>
      <h1>todos</h1>
      {todos?.map((todo, i) => {
        return (
          <div style={{ display: "flex" }} key={todo.id}>
            <h3>{todo.text}</h3> &nbsp; &nbsp; &nbsp;
            <button onClick={() => handleDelClick(todo.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
