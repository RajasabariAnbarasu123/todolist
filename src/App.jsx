import { useState } from "react";

const initialData = {
  pending: ["Visit Japan"],
  completed: ["Learn React"],
  planned: ["Run a Marathon"]
};

export default function App() {
  const [goals, setGoals] = useState(initialData);
  const [inputs, setInputs] = useState({
    pending: "",
    completed: "",
    planned: ""
  });

  const addGoal = (type) => {
    if (!inputs[type]) return;
    setGoals({ ...goals, [type]: [...goals[type], inputs[type]] });
    setInputs({ ...inputs, [type]: "" });
  };

  const deleteGoal = (type, index) => {
    const updated = [...goals[type]];
    updated.splice(index, 1);
    setGoals({ ...goals, [type]: updated });
  };

  return (
    <div className="container">
      <h1>Life Goals & Achievements</h1>
      <button className="edit-btn">Edit Layout</button>

      <div className="board">
        {Object.keys(goals).map((type) => (
          <div className="column" key={type}>
            <h2>{type === "pending" ? "Pending" : type === "completed" ? "Completed" : "2026 Planned"}</h2>

            {goals[type].map((goal, index) => (
              <div className="goal" key={index}>
                <span>{goal}</span>
                <div className="icons">
                  ⭐ ✏️
                  <span onClick={() => deleteGoal(type, index)}> ❌</span>
                </div>
              </div>
            ))}

            <div className="add-box">
              <input
                placeholder="Add new goal..."
                value={inputs[type]}
                onChange={(e) =>
                  setInputs({ ...inputs, [type]: e.target.value })
                }
              />
              <button onClick={() => addGoal(type)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
