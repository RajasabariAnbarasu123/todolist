import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api/goals";

export default function App() {
  const [goals, setGoals] = useState({
    pending: [],
    completed: [],
    planned: []
  });

  const [inputs, setInputs] = useState({
    pending: "",
    completed: "",
    planned: ""
  });

  // 🔹 Fetch goals from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Add goal
  const addGoal = async (type) => {
    if (!inputs[type]) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        goal: inputs[type]
      })
    });

    const newGoal = await res.json();

    setGoals({
      ...goals,
      [type]: [...goals[type], newGoal]
    });

    setInputs({ ...inputs, [type]: "" });
  };

  // 🔹 Delete goal
  const deleteGoal = async (type, id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    setGoals({
      ...goals,
      [type]: goals[type].filter((g) => g.id !== id)
    });
  };

  // 🔹 Move to completed
  const moveToCompleted = async (type, id) => {
    if (type === "completed") return;

    const res = await fetch(`${API_URL}/complete/${id}`, {
      method: "PUT"
    });

    const updatedGoal = await res.json();

    setGoals({
      ...goals,
      [type]: goals[type].filter((g) => g.id !== id),
      completed: [...goals.completed, updatedGoal]
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

            {goals[type].map((goal) => (
              <div className="goal" key={goal.id}>
                <span>{goal.goal}</span>

                <div className="icons">
                  {type !== "completed" && (
                    <span
                      onClick={() => moveToCompleted(type, goal.id)}
                    >
                      ✅
                    </span>
                  )}
                  <span
                    onClick={() => deleteGoal(type, goal.id)}
                  >
                    ❌
                  </span>
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
