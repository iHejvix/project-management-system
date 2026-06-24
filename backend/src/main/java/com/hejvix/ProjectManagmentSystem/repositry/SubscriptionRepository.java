package com.hejvix.ProjectManagmentSystem.repositry;

import com.hejvix.ProjectManagmentSystem.modal.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Subscription findByUserId(Long userId);
}
