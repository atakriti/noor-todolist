import React, { useContext, useState,useId } from "react";
import { Context } from "./ContextFun";
import "./todo.scss"
function Todo() {
  let {todo, setTodo, todos, setTodos } = useContext(Context);
    let [isEditing, setIsEditing] = useState({index:null,isEditing:false});
  let [isCompleted,setIsCompleted] = useState("all")
  console.log("🚀 ~ file: Todo.jsx:8 ~ isCompleted:", isCompleted)
  let handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]:e.target.value });
  };
  let handleSubmit = (e) => {
 
    e.preventDefault();
      if (isEditing.isEditing) {
          const newTodos = todos.map((item, i) => i === isEditing.index ? todo : item)
          setTodos(newTodos)
          setIsEditing({ index: null, isEditing: false })
          setTodo({ priority:"",text: "",title:"",isColored:false,category: "" });
          return;
      }
      setTodos([...todos, todo]);
      
      setTodo({ priority:"",text: "",title:"",isColored:false,category: "" });
      
  };
// ===================== Edit ========================
  let handleEdit = (p, i) => {

    setTodo(p);
    setIsEditing({index:i,isEditing:true});
  };
// ================================ change Color Completed ======================
  let handleChangeColor = (index) => {
    let colored = todos.map((item, i) =>
      index === i ? { ...item, isColored: !item.isColored } : item
    );
    setTodos(colored);
  };
// ====================================== Delete =======================
  let handleDelete = (i) => {
    let deleted = todos.filter((p, index) => i !== index)
    setIsEditing({...isEditing,isEditing:false})
    setTodos(deleted)
  }
  // =========================================== Filter Completed =============
  const filterComplete = (item) => {
    if (isCompleted === "all" || (isCompleted === "true" && item.isColored)) {
      return true;
    }
    if (isCompleted === "false" && !item.isColored) {
      return true;
    }
    return false;
  };
  let filteredTodos = todos.filter(filterComplete);

  // ================================================= Priority =============
  const [selectedPriority, setSelectedPriority] = useState("all");
  const handlePriorityChange = (index, priority) => {
    const newTodos = [...todos];
    newTodos[index].priority = priority;
    setTodos(newTodos);
  };
  const filterByPriority = (todos, selectedPriority) => {
    if (selectedPriority === "all") {
      return todos;
    } else {
      return todos.filter((todo) => todo.priority === selectedPriority);
    }
  };
  
   filteredTodos = filterByPriority(
    todos.filter(filterComplete),
    selectedPriority
  );
// ================================================ Category ===============
  const [selectedCategory, setSelectedCategory] = useState("all");
  const handleCategoryChange = (index, category) => {
    const newTodos = [...todos];
    newTodos[index].category = category;
    setTodos(newTodos);
  };
const filterCategories = (todos, selectedCategory) => {
  if (selectedCategory === "all") {
    return todos;
  } else {
    return todos.filter((todo) => todo.category === selectedCategory);
  }
};
  filteredTodos = filterCategories(filteredTodos, selectedCategory);
  // ===========================================================================
  return (
    <div className="main" >

      <div className="container">
        <h1>Welcome</h1>
        {/* purpel,skyblue,yellow,pink, red,green,black */}
        <h3>Choose the Completed:</h3>
        <select onChange={(e) => setIsCompleted(e.target.value)}>
          <option value="all">All</option>
        <option value={true}>Completed</option>
        <option value={false}>Incompleted</option>
        </select>
        {/* =========================== */}
        <h3>Choose the Priority:</h3>
        
        <select
      value={selectedPriority}
      onChange={(e) => setSelectedPriority(e.target.value)}
        >
      <option value="all">All</option>
      <option value="low">Low Priority</option>
      <option value="medium">Medium Priority</option>
      <option value="high">High Priority</option>
    </select>
 {/* =========================== */}
 <h3>Choose the Category:</h3>
        
        <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
        >
      <option value="all">All</option>
      <option value="personal">Personal</option>
      <option value="work">Work</option>
    </select>
    <h6>Total Tasks {todos.length}</h6>

      <form onSubmit={handleSubmit} action="">
          <input
          value={todo.title}
          onChange={handleChange}
          type="text"
          name="title"
            id=""
            required
            placeholder="Title..."
          />
           <input
          value={todo.text}
          onChange={handleChange}
          type="text"
          name="text"
            id=""
            required
            placeholder="Description..."
          />
          
        {isEditing.isEditing ? (
          <button  >Change Text</button>
        ) : (
          <button  >Add</button>
        )}
      </form>
{/* ================================= Mapping ====================== */}
        {filteredTodos.map((p, i) => (
        <ul key={i}>
          <li>
              <p className={p.isColored ? "red" : ""}><b>Title:</b> {p.title}</p>
              <p className={p.isColored ? "red" : ""}><b>Description:</b> {p.text}</p>
              {/* =============== */}
              <div className="checkbtns">
              <label>
        <input
          type="checkbox"
          checked={p.priority === "low"}
          onChange={() => handlePriorityChange(i, "low")}
        />
        Low
      </label>
      <label>
        <input
          type="checkbox"
          checked={p.priority === "medium"}
          onChange={() => handlePriorityChange(i, "medium")}
        />
        Medium
      </label>
      <label>
        <input
          type="checkbox"
          checked={p.priority === "high"}
          onChange={() => handlePriorityChange(i, "high")}
        />
        High
      </label>
              </div>
              {/* ============================ */}
              <div className="checkbtns">
              <label>
        <input
          type="checkbox"
          checked={p.category === "personal"}
          onChange={() => handleCategoryChange(i, "personal")}
        />
        Personal
      </label>
      <label>
        <input
          type="checkbox"
          checked={p.category === "work"}
          onChange={() => handleCategoryChange(i, "work")}
        />
        Work
      </label>
     
              </div>
              {/* ========================================= */}
         <div className="btns">
                <button onClick={() => handleChangeColor(i)}>{ p?.isColored ? "Not Done" : "Done"}</button>
            <button onClick={()=> handleDelete(i)}>Delete</button>
            <button onClick={() => handleEdit(p, i)}>Edit</button>
              </div>
              
         </li>
        </ul>
      ))}
   
      </div>
    </div>
  );
}

export default Todo;
