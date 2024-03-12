import { useState } from "react";
import "./App.css";
import AddTodo from "./components/addTodo";
import Todos from "./components/todos";
import PostList from "./components/PostList";

function App() {
  return (
    <div>
      <PostList />
    </div>
  );
}

export default App;
