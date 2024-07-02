import { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

type Todo = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};

export default function ListVoucher() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };
  return (
    <Fragment>
      <div className="mt-6 flex justify-between items-center">
        <div className="flex-1 mr-4">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Tìm kiếm phiếu giảm giá:
          </label>
          <input
            type="text"
            id="search"
            name="search"
            className="mt-1 block w-[30%] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Nhập mã phiếu để tìm kiếm..."
            // value={searchTerm}
            // onChange={handleSearch}
          />
        </div>
        <Button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {}}
        >
          Thêm Mới
        </Button>
      </div>

      <div className="w-[100%] h-[85vh] overflow-y-auto border border-gray-300 rounded-md shadow-md mt-2">
        <table className="table-auto md:table-fixed w-full text-sm">
          <thead className="sticky top-0 bg-gray-200 z-50">
            <tr className="text-left">
              <th className="px-4 py-2">Stt</th>
              <th className="px-4 py-2">Mã Phiếu</th>
              <th className="px-4 py-2">Ngày Bắt Đầu</th>
              <th className="px-4 py-2">Ngày Kết Thúc</th>
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
                    <Button variant="outlined" onClick={() => {}}>
                      Update
                    </Button>
                    <Button variant="outlined" onClick={() => {}}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
