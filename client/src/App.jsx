import React from "react";
import Register from "./components/Register";
import Todo from "./components/Todo";
import { Routes, Route } from "react-router-dom";
import "./style.scss";
import useLocalStorage from "use-local-storage";

function App() {
  const [user_id, setUserId] = useLocalStorage("user" || null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register setUserId={setUserId} />} />
        <Route path="/todo" element={<Todo user_id={user_id} />} />
      </Routes>
    </div>
  );
}

export default App;
