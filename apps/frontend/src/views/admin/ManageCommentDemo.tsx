import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

type Todo = {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
};

const ManageComponentDemo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
            setTodos(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching todos: ", error);
        }
    };

    const handleAddTodo = () => {
        const newTodo: Todo = {
            id: todos.length + 1,
            userId: 1,
            title: "New Todo",
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <Fragment>
            <div className="overflow-auto max-h-[500px] border border-gray-300 rounded-md shadow-md">
                <table className="table-auto md:table-fixed w-full text-sm">
                    <thead className="sticky top-0 bg-gray-200 z-50">
                        <tr className="text-left">
                            <th className="px-4 py-2">Stt</th>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">User ID</th>
                            <th className="px-4 py-2">Title</th>
                            <th className="px-4 py-2">Completed</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {todos.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{item.id}</td>
                                <td className="px-4 py-2">{item.userId}</td>
                                <td className="px-4 py-2">{item.title}</td>
                                <td className="px-4 py-2">{item.completed.toString()}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-2">
                                        <Button variant="outlined" onClick={() => handleAddTodo()}>Add</Button>
                                        <Button variant="outlined" onClick={() => handleDeleteTodo(item.id)}>Delete</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default ManageComponentDemo;
