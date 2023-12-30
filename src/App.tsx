import { useState } from 'react'
import { Container, AppBar, Toolbar, Typography, Stack, TextField, Button } from '@mui/material';
import TodoItem from './TodoItem';

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const [title, setTitle] = useState<TodoItemType["title"]>("");


  const completeHandler = (id:TodoItemType["id"]):void => {
    const newTodos:TodoItemType[] = todos.map((i) => {
      if(i.id === id)
        i.isCompleted = !i.isCompleted;
      return i;
    });
    setTodos(newTodos);
  }
  const deleteHandler = (id:TodoItemType["id"]):void => {
    const newTodos:TodoItemType[] = todos.filter((i) => {
      i.id !== id;
    })
    setTodos(newTodos);
  }

  const submitHandler = () :void => {
    const newTodo:TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  }

  const editHandler = (id:TodoItemType["id"], newTitle:TodoItemType["title"]) : void => {
    const newTodos:TodoItemType[] = todos.map((i)=> {
      if(i.id===id) i.title = newTitle;
      return i;
    });
    setTodos(newTodos);
  }
  
  return (
    <>
      <div>
      <Container maxWidth="xl" sx={{height:"100vh"}}>
        <AppBar position='static'>
          <Toolbar>
            <Typography>TODO App</Typography>
          </Toolbar>
        </AppBar>
        <Stack height={"80%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
          {
            todos.map((i) => (
              <TodoItem completeHandler={completeHandler} deleteHandler={deleteHandler} editHandler={editHandler} key={i.id} todo={i} />
            ))
          }
        </Stack>
        <TextField fullWidth label={"New Task"} value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => {
          if(e.key === "Enter" && title!=="")
          submitHandler();
        }} />
        <Button sx={{
          margin:"1rem 0",
          padding:"0.75rem 0",
        }}
        fullWidth variant='contained' onClick={submitHandler} disabled={title === ""} >
          ADD
        </Button>
      </Container>
      </div>
    </>
  )
}

export default App
