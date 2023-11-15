
import './App.css';
import { useState, useEffect } from 'react';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import { toast } from 'react-toastify';

const API_BASE = "http://localhost:3001";
function App() {

  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [updatedTitle, setupdatedTitle] = useState('');
  const [updatedDescription, setupdatedDescription] = useState('');
  const [edit, setEdit] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);


  const GetTodos = () => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.log("error aa gya"));
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/delete/" + id, {
      method: "DELETE"
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
    toast("Data deleted successfully");
  }

  const addTodo = async (req, res) => {
    if(!newTodoTitle && !newTodoDescription){
      toast.error("No Task to Add");
      return;
    }
    const data = await fetch(API_BASE + "/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newTodoTitle,
        description: newTodoDescription
      })
    }).then(res => res.json());

    setTodos([...todos, data]);
    setNewTodoTitle("");
    setNewTodoDescription("");
    toast.success("Task Created Successfully")
  }

  const updateTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? updatedData : todo
        );
        setTodos(updatedTodos);
        setEdit(false); // Reset the edit mode
        setEditTodoId(null); // Reset the edit todo ID
        setupdatedTitle("");
        setupdatedDescription("");
        toast.success("Task updated Successfully");
      } else {
        toast.error("Failed to Update Task");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  useEffect(() => {
    GetTodos();

    console.log(todos);
  }, [])

  return (
    <div className="App bg-gradient-to-br from-regal-blue to-hard-blue min-h-screen">
      <div className='py-10'>
        <p className='text-white text-4xl uppercase font-bold pb-10'>TODO APP</p>

        <div className='flex flex-col justify-center items-center'>
          <input
            type="text"
            placeholder="title"
            value={edit ? updatedTitle : newTodoTitle}
            onChange={(e) =>
              edit ? setupdatedTitle(e.target.value) : setNewTodoTitle(e.target.value)
            }
            className='py-1 px-3 w-[30%] mt-4 rounded-md bg-slate-400 placeholder-gray-600'
          ></input>
          <input
            type="text"
            placeholder="description"
            value={edit ? updatedDescription : newTodoDescription}
            onChange={(e) =>
              edit
                ? setupdatedDescription(e.target.value)
                : setNewTodoDescription(e.target.value)
            }
            className='py-1 px-3 w-[50%] my-4 rounded-md bg-slate-400 placeholder-gray-600'
          ></input>
          {edit ? (
            <button onClick={() => updateTodo(editTodoId)} className='bg-button px-6 py-1 rounded-md mb-6 uppercase font-semibold'>Update Task</button>
          ) : (
            <button onClick={addTodo} className='bg-button px-6 py-1 rounded-md mb-6 uppercase font-semibold'>Create Task</button>
          )}
        </div>

        <div className='flex flex-col justify-center items-center '>
          {
            todos.map(todo => (
              // <Todo key={todo._id } title={todo.title} description={todo.description} />
              <div key={todo._id} className='bg-map w-[700px] pl-6 py-2 pr-16 rounded-lg text-white relative min-h-[90px] mb-4'>
                <div className='text-3xl uppercase font-semibold'>{todo.title}</div>
                <div className='text-xl '>{todo.description}</div>
                <div className='absolute flex flex-col top-[50%] right-0'>
                <button onClick={() => deleteTodo(todo._id)
                } className='absolute right-6 top-[50%] text-red-600'><AiFillDelete size={28}/></button>
                <button
                  onClick={() => {
                    setEdit(true);
                    setEditTodoId(todo._id);
                    setupdatedTitle(todo.title);
                    setupdatedDescription(todo.description);
                  }}
                  className='absolute right-6 bottom-3 text-red-600'
                >
                  <AiFillEdit size={28}/>
                </button>
                </div>
                {/* <div>
                  <p>created at: {todo.createdAt}</p>
                  <p>updated at: {todo.updatedAt}</p>
                </div> */}
              </div>
            ))
          }
        </div>

      </div>
    </div>
  );
}

export default App;
