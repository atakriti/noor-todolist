import React from "react";
import Register from "./components/Register";
import Todo from "./components/Todo";
import { Routes, Route } from "react-router-dom"
import "./style.scss"
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Register />}/>
        <Route path="/todo" element={<Todo/>} />
        
        </Routes>
      
      
    </div>
  );
}

export default App;
