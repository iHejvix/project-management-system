package com.hejvix.ProjectManagmentSystem.service;

import com.hejvix.ProjectManagmentSystem.modal.PlanType;
import com.hejvix.ProjectManagmentSystem.modal.Subscription;
import com.hejvix.ProjectManagmentSystem.modal.User;

public interface SubscriptionService {
    void createSubscription(User user);

    Subscription getUsersSubscription(Long userId);

    Subscription updateSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);
}
