package com.hejvix.ProjectManagmentSystem.service;

import com.hejvix.ProjectManagmentSystem.modal.PlanType;
import com.hejvix.ProjectManagmentSystem.modal.Subscription;
import com.hejvix.ProjectManagmentSystem.modal.User;
import com.hejvix.ProjectManagmentSystem.repositry.SubscriptionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public void createSubscription(User user) {
        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setSubscriptionStartDate(LocalDate.now());
        subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        subscription.setValid(true);
        subscription.setPlanType(PlanType.FREE);
        subscriptionRepository.save(subscription);
    }

    @Override
    public Subscription getUsersSubscription(Long userId) {
       Subscription subscription = subscriptionRepository.findByUserId(userId);

       if (!isValid(subscription)) {
           subscription.setPlanType(PlanType.FREE);
           subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
           subscription.setSubscriptionStartDate(LocalDate.now());
       }
       return subscriptionRepository.save(subscription);
    }

    @Override
    public Subscription updateSubscription(Long userId, PlanType planType) {
        Subscription subscription = getUsersSubscription(userId);
        subscription.setPlanType(planType);
        subscription.setSubscriptionStartDate(LocalDate.now());
        if (planType == PlanType.ANNUALLY) {
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        } else {
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(1));
        }
        return subscriptionRepository.save(subscription);
    }

    @Override
    public boolean isValid(Subscription subscription) {
        if (subscription.getPlanType() == PlanType.FREE) {
            return true;
        }

        return LocalDate.now().isAfter(subscription.getSubscriptionStartDate())
                || LocalDate.now().isEqual(subscription.getSubscriptionEndDate());
    }
}
