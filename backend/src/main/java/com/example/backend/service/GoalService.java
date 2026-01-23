package com.example.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GoalService {

    private final Map<String, List<String>> goals = new HashMap<>();

    public GoalService() {
        goals.put("pending", new ArrayList<>());
        goals.put("completed", new ArrayList<>());
        goals.put("planned", new ArrayList<>());
    }

    public Map<String, List<String>> getAllGoals() {
        return goals;
    }

    public void addGoal(String type, String goal) {
        goals.get(type).add(goal);
    }

    public void deleteGoal(String type, int index) {
        goals.get(type).remove(index);
    }

    public void moveToCompleted(String type, int index) {
        String goal = goals.get(type).remove(index);
        goals.get("completed").add(goal);
    }
}
