package com.hejvix.ProjectManagmentSystem.service;

import com.hejvix.ProjectManagmentSystem.modal.User;

public interface UserService {
    User findUserByEmail(String email) throws Exception;

    User findUserByJwt(String jwt) throws Exception;

    User findUserById(Long userId) throws Exception;

    User updateProjectSize(User user, int size);

}
