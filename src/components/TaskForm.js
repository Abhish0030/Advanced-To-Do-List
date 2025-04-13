import React, { useState, useContext, useEffect, useRef } from "react";
import TaskContext from "../context/TaskContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = () => {
  const { addTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "personal",
    alarmSet: false,
    alarmTime: "",
  });

  const alarmTimeoutRef = useRef(null);
  const alarmAudioRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const showAlarmToast = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold">⏰ Alarm Time!</p>
          <div className="mt-2 flex gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              onClick={() => {
                if (alarmAudioRef.current) {
                  alarmAudioRef.current.pause();
                  alarmAudioRef.current.currentTime = 0;
                }
                closeToast();
              }}
            >
              Stop Alarm
            </button>
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
              onClick={() => {
                if (alarmAudioRef.current) {
                  alarmAudioRef.current.pause();
                  alarmAudioRef.current.currentTime = 0;
                }
                toast.dismiss();
                setTimeout(() => {
                  alarmAudioRef.current?.play();
                  showAlarmToast();
                }, 5 * 60 * 1000); // 5 minutes snooze
              }}
            >
              Snooze 5 min
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask(formData);

      toast.success("Task added successfully!");

      if (formData.alarmSet && formData.alarmTime) {
        const now = new Date().getTime();
        const alarmTime = new Date(formData.alarmTime).getTime();
        const timeUntilAlarm = alarmTime - now;

        if (timeUntilAlarm > 0) {
          alarmTimeoutRef.current = setTimeout(() => {
            if (alarmAudioRef.current) {
              alarmAudioRef.current.play().catch((err) => {
                console.error("Failed to play alarm sound:", err);
              });
            }
            showAlarmToast();
          }, timeUntilAlarm);
        }
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        category: "personal",
        alarmSet: false,
        alarmTime: "",
      });
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

  useEffect(() => {
    return () => {
      if (alarmTimeoutRef.current) {
        clearTimeout(alarmTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title*
          </label>
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
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
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
            <label className="block text-gray-700 mb-2" htmlFor="dueDate">
              Due Date*
            </label>
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
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Category*
            </label>
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
            <label className="block text-gray-700 mb-2" htmlFor="alarmTime">
              Alarm Time
            </label>
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

      {/* Hidden audio element */}
      <audio
        ref={alarmAudioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        preload="auto"
      />
    </div>
  );
};

export default TaskForm;
