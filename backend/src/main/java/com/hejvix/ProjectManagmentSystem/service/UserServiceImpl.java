package com.hejvix.ProjectManagmentSystem.service;

import com.hejvix.ProjectManagmentSystem.config.JwtProvider;
import com.hejvix.ProjectManagmentSystem.modal.User;
import com.hejvix.ProjectManagmentSystem.repositry.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String email = JwtProvider.getEmailFromToken(jwt);

        return findUserByEmail(email);
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User>optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new Exception("User not found");
        }

        return optionalUser.get();
    }

    @Override
    public User updateProjectSize(User user, int size) {
        user.setProjectSize(user.getProjectSize() + size);

        return userRepository.save(user);
    }
}
