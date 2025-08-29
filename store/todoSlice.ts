import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface Todo {
    id: number
    text: string
    complated: boolean
}

interface TodoState {
    todos: Todo[]
}

const loadTodosFromStorage = (): Todo[] => {
    try {
        const savedTodos = localStorage.getItem("todos")
        return savedTodos ? JSON.parse(savedTodos) : []
    } catch (err) {
        return []
    }
}

const initialState: TodoState = {
    todos: loadTodosFromStorage()
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo = {
                id: Date.now(),
                text: action.payload,
                complated: false
            }
            state.todos.push(newTodo)
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        tooggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(el => el.id === action.payload)
            if (todo) {
                todo.complated = !todo.complated
                localStorage.setItem("todos", JSON.stringify(state.todos))
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(el => el.id !== action.payload)
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },
        clearAll: (state) => {
            state.todos = state.todos.filter(el => !el.complated)
            localStorage.setItem("todos", JSON.stringify(state.todos))
        }
    }
})

export const { addTodo, tooggleTodo, deleteTodo, clearAll } = todoSlice.actions
export default todoSlice.reducer