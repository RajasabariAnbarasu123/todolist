package com.example.backend.service;

import com.example.backend.model.Goal;
import com.example.backend.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GoalService {

    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    public Map<String, List<Goal>> getAllGoals() {
        Map<String, List<Goal>> map = new HashMap<>();
        map.put("pending", goalRepository.findByType("pending"));
        map.put("completed", goalRepository.findByType("completed"));
        map.put("planned", goalRepository.findByType("planned"));
        return map;
    }

    public Goal addGoal(String type, String goalText) {
        Goal goal = new Goal(type, goalText);
        return goalRepository.save(goal);
    }

    public void deleteGoal(Long id) {
        goalRepository.deleteById(id);
    }

    public Goal moveToCompleted(Long id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        goal.setType("completed");
        return goalRepository.save(goal);
    }
}
