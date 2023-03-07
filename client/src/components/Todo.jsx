import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "./ContextFun";
import "./todo.scss";

function Todo({ user_id }) {
  let { todo, setTodo, todos, setTodos } = useContext(Context);
  let [isEditing, setIsEditing] = useState({ index: null, isEditing: false });
  let [isCompleted, setIsCompleted] = useState("all");
  // console.log("🚀 ~ file: Todo.jsx:9 ~ isCompleted:", isCompleted);

  let handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  let handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing.isEditing) {
      const fd = new FormData();

      for (let key in todo) {
        fd.append(key, todo[key]);
      }

      fd.append("route", "todos/edit");
      axios
        .post("/", fd)
        .then(({ data }) => {
          if (data === true) {
            const newTodos = todos.map((item, i) =>
              i === isEditing.index ? todo : item
            );
            setTodos(newTodos);
            setIsEditing({ index: null, isEditing: false });
            setTodo({
              priority: "",
              text: "",
              title: "",
              isColored: "0",
              category: "",
            });
          }
        })
        .catch((err) => console.error(err));

      return;
    } else {
      const fd = new FormData();

      for (let key in todo) {
        fd.append(key, todo[key]);
      }

      fd.append("user_id", user_id);
      fd.append("route", "todos/add");
      axios
        .post("/", fd)
        .then(({ data }) => {
          if (data) {
            setTodos([...todos, { ...todo, id: data, user_id }]);

            setTodo({
              priority: "",
              text: "",
              title: "",
              isColored: "0",
              category: "",
            });
          }
        })
        .catch((err) => console.error(err));
    }
  };
  // ===================== Edit ========================
  let handleEdit = (p, i) => {
    setTodo(p);
    setIsEditing({ index: i, isEditing: true });
  };
  // ================================ change Color Completed ======================
  let handleChangeColor = (index) => {
    let colored = todos.map((item, i) =>
      index === i
        ? { ...item, isColored: ((+item.isColored + 1) % 2).toString() }
        : item
    );
    setTodos(colored);

    update_single_task(colored[index]);
  };
  // ====================================== Delete =======================
  let handleDelete = (i, id) => {
    axios.get("/?route=todos/delete&id=" + id).then((_) => {
      let deleted = todos.filter((p, index) => i !== index);
      setIsEditing({ ...isEditing, isEditing: false });
      setTodos(deleted);
    });
  };
  // =========================================== Filter Completed =============
  const filterComplete = (item) => {
    if (
      isCompleted === "all" ||
      (isCompleted === "true" && item.isColored === "1")
    ) {
      return true;
    }
    if (isCompleted === "false" && !item.isColored === "1") {
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

    update_single_task(newTodos[index]);
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

    update_single_task(newTodos[index]);
  };
  const filterCategories = (todos, selectedCategory) => {
    if (selectedCategory === "all") {
      return todos;
    } else {
      return todos.filter((todo) => todo.category === selectedCategory);
    }
  };
  filteredTodos = filterCategories(filteredTodos, selectedCategory);

  // back-end function
  function update_single_task(task) {
    const fd = new FormData();

    for (let key in task) {
      fd.append(key, task[key]);
    }

    fd.append("route", "todos/edit");
    axios.post("/", fd).catch((err) => console.error(err));
  }

  // ===========================================================================
  return (
    <div className="main">
      <div className="container">
        <h1>Welcome </h1>
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

        <form onSubmit={handleSubmit}>
          <input
            value={todo.title}
            onChange={handleChange}
            type="text"
            name="title"
            required
            placeholder="Title..."
          />
          <textarea
            value={todo.text}
            onChange={handleChange}
            type="text"
            name="text"
            required
            placeholder="Description..."
          />

          {isEditing.isEditing ? (
            <button>Change Text</button>
          ) : (
            <button>Add</button>
          )}
        </form>
        {/* ================================= Mapping ====================== */}
        {filteredTodos.map((p, i) => (
          <ul key={i}>
            <li>
              <div className="todo">
                <h3 className={+p.isColored > 0 ? "red" : ""}>{p.title}</h3>
                <div className={+p.isColored > 0 ? "red" : ""}>
                  <pre>{p.text}</pre>
                </div>
              </div>
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
                <button onClick={() => handleChangeColor(i)}>
                  {p?.isColored === "1" ? "Not Done" : "Done"}
                </button>
                <button onClick={() => handleDelete(i, p.id)}>Delete</button>
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
