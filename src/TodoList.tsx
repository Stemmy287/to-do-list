import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {DeleteForeverOutlined} from "@material-ui/icons";

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, toDoListId: string) => void
    removeTask: (taskId: string, toDoListId: string) => void
    changeFilter: (filter: FilterValuesType, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    toDoListId: string
    removeToDoList: (toDoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, toDoListId: string) => void
    changeToDoListTitle: (title: string, toDoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSXItemsList = props.tasks.length
        ? <List>
            {
                props.tasks.map((task) => {
                    const removeTask = () => props.removeTask(task.id, props.toDoListId)
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.toDoListId)
                    const isDoneClass = task.isDone ? "isDone" : ""
                    const changeTaskTitle = (nextTitle: string) => {
                        props.changeTaskTitle(task.id, nextTitle, props.toDoListId)
                    }
                    return (
                        <ListItem style={{padding: '0'}} key={task.id} className={isDoneClass}>
                            <Checkbox checked={task.isDone} onChange={changeTaskStatus} size={'small'}/>
                            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                            <IconButton onClick={removeTask} size={'small'}><DeleteForeverOutlined/></IconButton>
                        </ListItem>
                    )
                })
            }
        </List>
        : <span>Your list is empty</span>

    const changeFilterHandlerCreator = (filter: FilterValuesType) => () => {
        props.changeFilter(filter, props.toDoListId)
    }

    const removeToDoListHandler = () => {
        props.removeToDoList(props.toDoListId)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.toDoListId)
    }

    const changeToDoListTitle = (nextTitle: string) => {
        props.changeToDoListTitle(nextTitle, props.toDoListId)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeToDoListTitle}/>
                <IconButton onClick={removeToDoListHandler} size={'small'}><DeleteForeverOutlined/></IconButton>
            </h3>
            <div>
                <AddItemForm addITem={addTask} placeholderValue={'add new task'}/>
            </div>
            {tasksJSXItemsList}
            <div>
                <Button
                    style={{marginRight: '2px'}}
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={'small'}
                    disableElevation
                    onClick={changeFilterHandlerCreator("all")}
                >All</Button>
                <Button
                    style={{marginRight: '2px'}}
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={'small'}
                    disableElevation
                    onClick={changeFilterHandlerCreator("active")}
                >Active</Button>
                <Button
                    style={{marginRight: '2px'}}
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size={'small'}
                    disableElevation
                    onClick={changeFilterHandlerCreator("completed")}
                >Completed</Button>
            </div>
        </div>
    );
};

export default TodoList;