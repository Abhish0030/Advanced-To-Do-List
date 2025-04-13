import React, { useState, useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'personal',
    alarmSet: false,
    alarmTime: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(formData);
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        category: 'personal',
        alarmSet: false,
        alarmTime: ''
      });
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="dueDate">Due Date*</label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="alarmSet"
            name="alarmSet"
            checked={formData.alarmSet}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="alarmSet">Set Alarm</label>
        </div>
        
        {formData.alarmSet && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="alarmTime">Alarm Time</label>
            <input
              type="datetime-local"
              id="alarmTime"
              name="alarmTime"
              value={formData.alarmTime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              min={formData.dueDate}
            />
          </div>
        )}
        
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;