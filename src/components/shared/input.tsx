import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../../../store/todoSlice"

export const Input = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (value.trim()) {
            dispatch(addTodo(value))
            setValue("")
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"w-full"}>
            <input value={value} onChange={e => setValue(e.target.value)} onClick={e => e.stopPropagation()} placeholder="What needs to be done" className={"w-full italic z-100 relative"} type="text" />
        </form>
    )
}