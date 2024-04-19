import React, { useState, useEffect } from 'react'
import "./App.css"
import ToDoInput from './components/ToDoInput'
import Todolist from './components/ToDoList';
import axios from 'axios';
function App() {
const [listToDo, setListTodo] = useState([]);
const [todos, setTodos] = useState([]);
useEffect(() => {
  const fetchTodos = async () => {
      try {
          const response = await axios.get('http://127.0.0.1:8000/todos');
          setTodos(response.data);
          console.log(response.data);
      } catch (error) {
          console.error('Error fetching todos:', error);
      }
  };

fetchTodos();
}, []);

  let addList = (inputText)=>{
    if(inputText!=='')
    setListTodo([...listToDo, inputText])
    setListTodo([...listToDo, inputText]);
  }
 
return(
  <div className="main-container">
    <div className="center-container">
     <ToDoInput addList = {addList}/>
     <h1 className="app-heading">TODO</h1>
     <hr/>
        <Todolist item = {todos}/> 
    </div>
  </div>
)
}
export default App