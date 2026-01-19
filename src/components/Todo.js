import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";

function TaskSection({task,data,type,onEdit,onDelete,onMove,activeEditSection,setActiveEditSection}) {
  const isEditing = activeEditSection === type;

  return (
    <div className="section">
      <div className="section-head">
        <h3>{task} Tasks</h3>

        {!isEditing ? (
          <button onClick={() => setActiveEditSection(type)}>Edit</button>
        ) : (
          <button onClick={() => setActiveEditSection(null)}>Cancel</button>
        )}
      </div>

      <ol>
        {data.map((item) => (
          <li key={item.id}>
            {item.task}

            {isEditing && (
              <>
                <button
                  className="edit"
                  onClick={() => onEdit(type, item)}
                >
                  Edit
                </button>

                <button
                  className="del"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </>
            )}
            {onMove && nextStatus[type] && (
              <button
                className="move"
                onClick={() => onMove(item, type)}
              >
                ➜ Move
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

const nextStatus = {
  newtask: "pending",
  pending: "completed"
};

export default function Todo() {

  const [list, setList] = useState({
    completed: [],
    pending: [],
    newtask: []
  });

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [editType, setEditType] = useState("");
  const [editId, setEditId] = useState(null);
  const [activeEditSection, setActiveEditSection] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    getTasks().then(res => {
      const grouped = {
        completed: [],
        pending: [],
        newtask: []
      };

      res.data.forEach(task => {
        grouped[task.status].push(task);
      });

      setList(grouped);
    });
  };

  const addNewTask = () => {
    if (!input.trim()) return;

    addTask({
      task: input,
      status: "newtask"
    }).then(() => {
      setInput("");
      loadTasks();
    });
  };

  const handleDelete = (id) => {
    deleteTask(id).then(() => loadTasks());
  };

  const openEditModal = (type, task) => {
    setEditType(type);
    setEditId(task.id);
    setEditText(task.task);
    setIsOpen(true);
  };

  const saveEdit = () => {
    updateTask(editId, {
      task: editText,
      status: editType
    }).then(() => {
      setIsOpen(false);
      loadTasks();
    });
  };

const moveTask = (task, currentType) => {
  if (!task.id) {
    console.error("Task ID is missing", task);
    return;
  }

  updateTask(task.id, {
    task: task.task,
    status: nextStatus[currentType]
  }).then(() => loadTasks());
};


  return (
    <>
      <div className="inp-set">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addNewTask}>Add</button>
      </div>

      <div className="dis">
        <TaskSection
          task="New"
          data={list.newtask}
          type="newtask"
          onEdit={openEditModal}
          onDelete={handleDelete}
          onMove={moveTask}
          activeEditSection={activeEditSection}
          setActiveEditSection={setActiveEditSection}
        />

        <TaskSection
          task="Pending"
          data={list.pending}
          type="pending"
          onEdit={openEditModal}
          onDelete={handleDelete}
          onMove={moveTask}
          activeEditSection={activeEditSection}
          setActiveEditSection={setActiveEditSection}
        />

        <TaskSection
          task="Completed"
          data={list.completed}
          type="completed"
          onEdit={openEditModal}
          onDelete={handleDelete}
          activeEditSection={activeEditSection}
          setActiveEditSection={setActiveEditSection}
        />
      </div>

      {isOpen && (
        <div className="modal-bg">
          <div className="modal-box">
            <h3>Edit Task</h3>

            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <div className="modal-btns">
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}