package com.example.backend.controller;

import com.example.backend.model.GoalRequest;
import com.example.backend.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/goals")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public Map<String, List<String>> getGoals() {
        return goalService.getAllGoals();
    }

    @PostMapping
    public void addGoal(@RequestBody GoalRequest request) {
        goalService.addGoal(request.getType(), request.getGoal());
    }

    @DeleteMapping("/{type}/{index}")
    public void deleteGoal(
            @PathVariable String type,
            @PathVariable int index
    ) {
        goalService.deleteGoal(type, index);
    }

    @PutMapping("/complete/{type}/{index}")
    public void moveToCompleted(
            @PathVariable String type,
            @PathVariable int index
    ) {
        goalService.moveToCompleted(type, index);
    }
}
