import React, { createContext, useState } from 'react'
import useLocalStorage from 'use-local-storage'
export const Context = createContext()


export default function ContextFun(props) {
    let [todo, setTodo] = useState({ priority:"",text: "",title:"",isColored:false,category: "" })
  let [todos, setTodos] = useLocalStorage("todos", []) //! This must be replaced to the Todo-Array of the Signed-in user
  let [signinValue, setSigninValue] = useLocalStorage("SigninValueTodo",{
    email: "",
    password: "",
  });
  let [signupValue, setSignupValue] = useState({
    email: "",
    username: "",
    password: "",
  });
  return (
      <Context.Provider value={{todo, setTodo,todos,setTodos,signinValue, setSigninValue,signupValue, setSignupValue}}>
          {props.children}

    </Context.Provider>
  )
}
