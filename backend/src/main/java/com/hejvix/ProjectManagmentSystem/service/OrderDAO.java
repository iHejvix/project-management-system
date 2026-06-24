package com.hejvix.ProjectManagmentSystem.service;

import com.hejvix.ProjectManagmentSystem.modal.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderDAO extends CrudRepository<Order, Long> {

    Order findByPaypalOrderId(String paypalOrderId);
}