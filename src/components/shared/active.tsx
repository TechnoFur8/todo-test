import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../store"
import { clearAll, deleteTodo, tooggleTodo } from "../../../store/todoSlice"
import { Check, Trash } from "lucide-react"
import { cn } from "../../lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Input } from "./input"
import { Button } from "../ui/button"

interface Props {
    activeTab: string
    setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export const Active = ({ setActiveTab, activeTab }: Props) => {
    const todos = useSelector((state: RootState) => state.todos.todos)
    const dispatch = useDispatch()

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id))
    }

    const handleToggle = (id: number) => {
        dispatch(tooggleTodo(id))
    }

    const handleDeleteAll = () => {
        dispatch(clearAll())
    }

    const filterTodos = todos.filter(el => !el.complated)

    return (
        <Accordion collapsible type="single" defaultValue="1">
            <AccordionItem value="1">
                <div className={"bg-white px-3 shadow- rounded-0 border-b-zinc-300 border-1"}>
                    <AccordionTrigger>
                        <Input />
                    </AccordionTrigger>
                </div>
                <AccordionContent className={"p-0"}>
                    <ul className={"flex flex-col-reverse"}>
                        {filterTodos.map(el => (
                            <li className={"bg-white py-3 border-b-zinc-300 border-1 shadow flex items-center justify-between pl-3"} key={el.id}>
                                <div className={"flex items-center space-x-3"}>
                                    <div>
                                        <input type="checkbox" id={`todo-${el.id}`} onChange={() => handleToggle(el.id)} className={"sr-only"} checked={el.complated} />
                                        <label htmlFor={`todo-${el.id}`} className={cn(
                                            "size-6 border-2 border-gray-300 rounded-full cursor-pointer flex items-center justify-center transition-colors",
                                            el.complated && ""
                                        )}>
                                            {el.complated && (
                                                <Check className={"text-green-600"} />
                                            )}
                                        </label>
                                    </div>
                                    <span className={cn(el.complated && "line-through text-zinc-400", "text-[18px]")}>
                                        {el.text}
                                    </span>
                                </div>
                                <button className={"cursor-pointer text-gray-300 pr-3 hover:text-red-600 hover:duration-300"} onClick={() => handleDelete(el.id)}><Trash /></button>
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
                <div className={"flex items-center justify-between bg-white shadow py-2 border-t-zinc-300 border-1 px-3"}>
                    <span className={"text-zinc-400 font-normal"}>{filterTodos.length}</span>
                    <div className={"space-x-2"}>
                        <Button variant={"link"} className={"cursor-pointer text-zinc-400 font-normal"} onClick={() => setActiveTab("ALL")}>All</Button>
                        <Button variant={"link"} className={cn("cursor-pointer text-zinc-400 font-normal", activeTab === "ACTIVE" && "underline")} onClick={() => setActiveTab("ACTIVE")}>Active</Button>
                        <Button variant={"link"} className={"cursor-pointer text-zinc-400 font-normal"} onClick={() => setActiveTab("COMPLITED")}>Completed</Button>
                    </div>
                    <button onClick={() => handleDeleteAll()} className={"cursor-pointer text-zinc-400 font-normal"}>Clear Completed</button>
                </div>
            </AccordionItem>
        </Accordion>
    )
}