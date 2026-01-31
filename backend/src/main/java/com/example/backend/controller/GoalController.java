package com.example.backend.controller;

import com.example.backend.model.Goal;
import com.example.backend.model.GoalRequest;
import com.example.backend.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public Map<String, List<Goal>> getGoals() {
        return goalService.getAllGoals();
    }

    @PostMapping
    public Goal addGoal(@RequestBody GoalRequest request) {
        return goalService.addGoal(request.getType(), request.getGoal());
    }

    @DeleteMapping("/{id}")
    public void deleteGoal(@PathVariable Long id) {
        goalService.deleteGoal(id);
    }

    @PutMapping("/complete/{id}")
    public Goal moveToCompleted(@PathVariable Long id) {
        return goalService.moveToCompleted(id);
    }
}
