import { useState } from "react";

const initialData = {
  pending: [],
  completed: [],
  planned: []
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

    setGoals({
      ...goals,
      [type]: [...goals[type], inputs[type]]
    });

    setInputs({
      ...inputs,
      [type]: ""
    });
  };

  const deleteGoal = (type, index) => {
    const updated = [...goals[type]];
    updated.splice(index, 1);

    setGoals({
      ...goals,
      [type]: updated
    });
  };

  // Move goal to Completed
  const moveToCompleted = (type, index) => {
    if (type === "completed") return;

    const goalToMove = goals[type][index];

    const updatedSource = [...goals[type]];
    updatedSource.splice(index, 1);

    setGoals({
      ...goals,
      [type]: updatedSource,
      completed: [...goals.completed, goalToMove]
    });
  };

  return (
    <div className="container">
      <h1>Life Goals & Achievements</h1>

      <div className="board">
        {Object.keys(goals).map((type) => (
          <div className="column" key={type}>
            <h2>
              {type === "pending"
                ? "Pending"
                : type === "completed"
                ? "Completed"
                : "2026 Planned"}
            </h2>

            {goals[type].map((goal, index) => (
              <div className="goal" key={index}>
                <span>{goal}</span>

                <div className="icons">
                  {type !== "completed" && (
                    <span onClick={() => moveToCompleted(type, index)}> ✅</span>
                  )}
                  <span onClick={() => deleteGoal(type, index)}> ❌</span>
                </div>
              </div>
            ))}

            <div className="add-box">
              <input
                placeholder="Add new goal..."
                value={inputs[type]}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    [type]: e.target.value
                  })
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
