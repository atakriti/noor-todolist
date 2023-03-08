import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
export const Context = createContext();

export default function ContextFun(props) {
  let [todo, setTodo] = useState({
    priority: "",
    text: "",
    title: "",
    isColored: "0",
    category: "",
  });

  // add todos from Database
  let [user, setUser] = useLocalStorage("user", null);
  let [todos, setTodos] = useState([]);
  //! This must be replaced to the Todo-Array of the Signed-in user
  // DONE

  let [signupValue, setSignupValue] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get("/?route=todos&user_id=" + user)
      .then(({ data }) => setTodos(data));
  }, [user]);

  return (
    <Context.Provider
      value={{
        todo,
        setTodo,
        todos,
        setTodos,
        user,
        setUser,
        signupValue,
        setSignupValue,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
