package com.hejvix.ProjectManagmentSystem.repositry;

import com.hejvix.ProjectManagmentSystem.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
