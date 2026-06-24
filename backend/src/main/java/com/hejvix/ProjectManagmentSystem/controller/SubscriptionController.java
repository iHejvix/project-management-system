package com.hejvix.ProjectManagmentSystem.controller;

import com.hejvix.ProjectManagmentSystem.modal.PlanType;
import com.hejvix.ProjectManagmentSystem.modal.Subscription;
import com.hejvix.ProjectManagmentSystem.modal.User;
import com.hejvix.ProjectManagmentSystem.service.SubscriptionService;
import com.hejvix.ProjectManagmentSystem.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final UserService userService;

    public SubscriptionController(SubscriptionService subscriptionService, UserService userService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<Subscription> getUserSubscription(@RequestHeader("Authorization") String jwt) throws Exception {
        return ResponseEntity.ok(subscriptionService.
                getUsersSubscription(userService.findUserByJwt(jwt).getId()));
    }

    @PatchMapping("/upgrade")
    public ResponseEntity<Subscription> updateSubscription(@RequestHeader("Authorization") String jwt,
                                                           @RequestBody PlanType planType) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Subscription subscription = subscriptionService.updateSubscription(user.getId(), planType);

        return ResponseEntity.ok(subscription);

    }

}
