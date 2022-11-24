import React, {useState} from 'react'
import './App.css'
import TodoList from "./TodoList"
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


type inTasksType = {
    data: Array<dataType>
    filter: FilterValuesType
}

type dataType = {
    id: string,
    title: string,
    isDone: boolean
}

export type tasksStateType = {
    [toDoListId_1: string]: inTasksType
}

export type FilterValuesType = "all" | "active" | "completed"
// Create +
// Read => +, filtration
// Update +
// Delete +

type toDoListsType = {
    id: string
    title: string
}


function App() {
    // BLL:

    /*const [toDoLists, setTodoLists] = useState<Array<toDoListsType>>([
        {id: toDoListId_1, title: 'What to learn', filter: 'all'},
        {id: toDoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<tasksStateType>({
        [toDoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & ES6", isDone: true},
            {id: v1(), title: "REACT & TS", isDone: false},
        ],
        [toDoListId_2]: [
            {id: v1(), title: "Cola", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ]
    })*/

    const toDoListId_1 = v1()
    const toDoListId_2 = v1()

    let [toDoLists, setToDoLists] = useState<Array<toDoListsType>>([
        {id: toDoListId_1, title: "What to learn"},
        {id: toDoListId_2, title: "What to buy"}
    ])

    let [tasks, setTasks] = useState<tasksStateType>({
        [toDoListId_1]: {
            data: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false}
            ],
            filter: "all"
        },
        [toDoListId_2]: {
            data: [
                {id: v1(), title: "HTML&CSS1", isDone: true},
                {id: v1(), title: "JS1", isDone: false}
            ],
            filter: "all"
        }
    });


    //

    const removeTask = (taskId: string, toDoListId: string) => {
        setTasks({
            ...tasks,
            [toDoListId]: {...tasks[toDoListId], data: tasks[toDoListId].data.filter(t => t.id !== taskId)}
        })
    }

    const addTask = (title: string, toDoListId: string) => {
        const newTask: dataType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [toDoListId]: {...tasks[toDoListId], data: [newTask, ...tasks[toDoListId].data]}})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, toDoListId: string) => {
        setTasks({
            ...tasks,
            [toDoListId]: {
                ...tasks[toDoListId],
                data: tasks[toDoListId].data.map(el => el.id === taskId ? {...el, isDone} : el)
            }
        })
    }

    const changeTaskTitle = (taskId: string, title: string, toDoListId: string) => {
        setTasks({
            ...tasks,
            [toDoListId]: {
                ...tasks[toDoListId],
                data: tasks[toDoListId].data.map(el => el.id === taskId ? {...el, title} : el)
            }
        })
    }

    const changeToDoListTitle = (title: string, toDoListId: string) => {
        setToDoLists(toDoLists.map(el => el.id === toDoListId ? {...el, title} : el))
    }

    const changeFilter = (filter: FilterValuesType, toDoListId: string) => {
        setTasks({...tasks, [toDoListId]: {...tasks[toDoListId], filter: filter}})
    }

    const removeToDoList = (toDoListId: string) => {
        setToDoLists(toDoLists.filter(tl => tl.id !== toDoListId))
        delete tasks[toDoListId]
    }

    const getFilteredTasks = (tasks: Array<dataType>, filterValue: FilterValuesType) => {
        let filteredTasks = tasks
        if (filterValue === "active") {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if (filterValue === "completed") {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }

    const addToDoList = (title: string) => {
        const newToDoListId: string = v1()
        const newToDoList: toDoListsType = {
            id: newToDoListId,
            title: title
        }
        setToDoLists([...toDoLists, newToDoList])
        setTasks({...tasks, [newToDoListId]: {...tasks[newToDoListId], data: [], filter: 'all'}})
    }

    const todoListsComponents = toDoLists.length ? toDoLists.map((tl) => {

        const filteredTasks = getFilteredTasks(tasks[tl.id].data, tasks[tl.id].filter)

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: '20px'}} elevation={5}>
                    <TodoList
                        toDoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tasks[tl.id].filter}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeToDoList={removeToDoList}
                        changeTaskTitle={changeTaskTitle}
                        changeToDoListTitle={changeToDoListTitle}
                    />

                </Paper>
            </Grid>
        )
    }) : <span>Create your first toDoList</span>

    //GUI:
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{paddingTop: '30px'}}>
                <Grid container>
                    <AddItemForm addITem={addToDoList} placeholderValue={'add new todolist'}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

