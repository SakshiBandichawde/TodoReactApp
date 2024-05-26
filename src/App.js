import './App.css';
import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";


function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTodos,setTodos]=useState([]);
  const [newTitle,setNewTitle]=useState("");
  const [newDiscription,setNewDiscription]=useState("");
  const [completedTodos,setCompletedTodos]=useState([]);


  {/* To Change Theme  */}
  const [theme,setTheme]=useState('dark-theme');
  const [buttonText, setButtonText] = useState('Light');
  const toggleTheme=()=>{
    if(theme==='dark-theme'){
      setTheme('light-theme')
      setButtonText('Dark');
    }else{
      setTheme('dark-theme');
      setButtonText('Light')
    }
    

  }

  useEffect(()=>{
    document.body.className=theme;

  },[theme]);


  

  {/* To Update Todo Items  */}
  const handleAddTodo=()=>{
    let newTodoItem={
      title:newTitle,
      discription:newDiscription,
    }

    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));


    setNewTitle('');
    setNewDiscription('');
  };


  {/* To Delete Todo from Todo List  */}
  const handleDeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }


  {/* To Delete Todo from completedTodo List  */}
  const handleDeleteCompletedTodo=(index)=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index,1);

    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  {/* To Drop In Completed Tab Todo  */}
  const handleComplete=(index)=>{
    let now=new Date();
    let dd=now.getDay();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let hr=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();

    let completedOn=dd+'-'+mm+'-'+yyyy+'at'+hr+':'+m+':'+s;

    let filteredItem={
      ...allTodos[index],
      completedOn:completedOn
    }
    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
  }


  useEffect(()=>{
    let savedTodo=JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'))
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }

  },[])
  return (
    <div className="App">
      <div className='header'>
        <h1></h1>
      <h1>My Todos</h1>
      <button className='toggleBtn' onClick={toggleTheme} style={{ backgroundColor: theme === 'dark-theme' ? '#fff' : '#333', color: theme === 'dark-theme' ? '#000' : '#fff' }}>{buttonText}</button>
      </div>
        <div className="todo-wrapper">
          {/* Input Area */}
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="what's the task title?"></input>
            </div>

            <div className="todo-input-item">
              <label>Discription</label>
              <input type="text" value={newDiscription} onChange={(e)=>setNewDiscription(e.target.value)} placeholder="what's the task Discription?"></input>
            </div>

            <div className="todo-input-item">
              <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
            </div>
          </div>
          {/* Input Area End */}

         {/* Button Area End */}
          <div className="btn-area">
            <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>ToDo</button>
            <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
          </div>
          {/* Button Area End */}

          {/* Updated Area */}
          
            {isCompleteScreen===false && allTodos.map((item,index)=>{
              return(
                <>
                <div className="todo-list">
                <div className="todo-list-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.discription}</p>
                </div><div className='icons'>
                    <MdDeleteOutline className='icon' onClick={()=>handleDeleteTodo(index)} />
                    <FaCheckCircle className='check-icon' onClick={()=>handleComplete(index)} />
                  </div>
                  </div>
                  </>
              )
            })}


         {isCompleteScreen===true && completedTodos.map((item,index)=>{
              return(
                <>
                <div className="todo-list">
                <div className="todo-list-item" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.discription}</p>
                  <p><small>Completed On: {item.completedOn}</small></p>
                </div><div className='icons'>
                    <MdDeleteOutline className='icon' onClick={()=>handleDeleteCompletedTodo(index)} />
                  </div>
                  </div>
                  </>
              )
            })}
         
          {/* Updated Area End*/}

        </div>
    </div>
  );
}

export default App;
