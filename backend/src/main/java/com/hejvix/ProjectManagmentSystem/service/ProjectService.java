package com.hejvix.ProjectManagmentSystem.service;

import com.hejvix.ProjectManagmentSystem.modal.Chat;
import com.hejvix.ProjectManagmentSystem.modal.Project;
import com.hejvix.ProjectManagmentSystem.modal.User;

import java.util.List;

public interface ProjectService {

    Project createProject(Project project, User user) throws Exception;

    Project getProjectById(Long id) throws Exception;

    List<Project> getProjectByTeam(User user, String category, String tag) throws Exception;

    void deleteProject(Long projectId, long userId) throws Exception;

    Project updateProject(Project project, Long id) throws Exception;

    void addUserToProject(Long projectId, Long userId) throws Exception;

    void removeUserFromProject(Long projectId, Long userId) throws Exception;

    Chat getChatProjectId(Long projectId) throws Exception;

    List<Project> searchProject(String keyWord, User user) throws Exception;

}
