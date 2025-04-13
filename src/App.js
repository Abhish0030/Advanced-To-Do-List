import React from "react";
import { TaskProvider } from "./context/TaskContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import backgroundImage from "C:/Users/asus/advanced-todo-list/frontend/src/image.jpg";
import "./App.css";
function App() {
  return (
    <TaskProvider>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat py-8 px-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-white bg-opacity-80 rounded-xl shadow-md max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Advanced To-Do List
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <TaskForm />
            </div>
            <div className="lg:col-span-2">
              <TaskList />
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </TaskProvider>
  );
}

export default App;
