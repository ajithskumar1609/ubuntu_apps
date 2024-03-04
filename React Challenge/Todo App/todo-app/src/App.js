import React, { useState } from "react";
import "./App.css";

function App() {
  const [toDo, setTodo] = useState("");
  const [toDos, setTodos] = useState([]);
  const addTodo = () => {
    setTodos([...toDos, { id: Date.now(), text: toDo, status: false }]);
    setTodo("");
  };
  const changeTodoText = () => {
    const todoTextElement = document.getElementById("js-todo-text");
    todoTextElement.classList.toggle("todoTextFinished");
    // console.log(todoTextElement);
  };
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          onChange={(event) => {
            setTodo(event.target.value);
          }}
          value={toDo}
          type="text"
          placeholder="🖊️ Add item..."
          onKeyUp={(e) => {
            e.key === "Enter" ? addTodo() : console.log("");
          }}
        />
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className="todo">
              <div className="left">
                <input
                  onChange={(event) => {
                    setTodos(
                      toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.status = event.target.checked;
                          changeTodoText();
                          console.log(toDos);
                        }
                        return obj2;
                      })
                    );
                  }}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p id="js-todo-text">{obj.text}</p>
              </div>
              <div className="right">
                <i
                  onClick={() => {
                    setTodos(
                      toDos.filter((obj3) => {
                        if (obj3.id === obj.id) {
                          obj3 = null;
                        }
                        return obj3;
                      })
                    );
                  }}
                  className="fas fa-times"
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      {toDos.map((obj) => {
        if (obj.status) {
          return <h1>{obj.text}</h1>;
        }
        return null;
      })}
    </div>
  );
}

export default App;
