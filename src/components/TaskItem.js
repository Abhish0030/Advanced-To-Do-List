import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { FaTrash, FaBell, FaCheck, FaUndo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);

  const handleComplete = async () => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      toast.success(`Task marked as ${task.completed ? 'incomplete' : 'complete'}!`);
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`border rounded-lg p-4 ${task.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`mt-1 text-gray-600 ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleComplete}
            className={`p-2 rounded-full ${task.completed ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? <FaUndo size={14} /> : <FaCheck size={14} />}
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full bg-red-100 text-red-600"
            title="Delete task"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <span className={`px-2 py-1 rounded-full ${
          task.category === 'work' ? 'bg-blue-100 text-blue-800' :
          task.category === 'personal' ? 'bg-purple-100 text-purple-800' :
          task.category === 'shopping' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {task.category}
        </span>
        
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800">
          Due: {formatDate(task.dueDate)}
        </span>
        
        {task.alarmSet && task.alarmTime && (
          <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 flex items-center">
            <FaBell className="mr-1" size={12} />
            Alarm: {formatDate(task.alarmTime)}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;