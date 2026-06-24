package com.hejvix.ProjectManagmentSystem.service;

import com.hejvix.ProjectManagmentSystem.modal.Chat;
import com.hejvix.ProjectManagmentSystem.modal.Project;
import com.hejvix.ProjectManagmentSystem.modal.User;
import com.hejvix.ProjectManagmentSystem.repositry.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    private final UserService userService;

    private final ChatService chatService;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, UserService userService, ChatService chatService) {
        this.projectRepository = projectRepository;
        this.userService = userService;
        this.chatService = chatService;
    }

    @Override
    public Project createProject(Project project, User user) {
        Project createdProject = new Project();
        createdProject.setOwner(user);
        createdProject.setName(project.getName());
        createdProject.setTags(project.getTags());
        createdProject.setCategory(project.getCategory());
        createdProject.setDescription(project.getDescription());
        createdProject.getTeam().add(user);

        Project savedProject = projectRepository.save(createdProject);

        Chat chat = new Chat();
        chat.setProject(savedProject);

        Chat projectChat = chatService.createChat(chat);
        savedProject.setChat(projectChat);

        return savedProject;
    }

    @Override
    public Project getProjectById(Long id) throws Exception {
        Optional<Project> project = projectRepository.findById(id);

        if (project.isEmpty()) {
            throw new Exception("Project not found");
        }
        return project.get();
    }

    @Override
    public List<Project> getProjectByTeam(User user, String category, String tag) {
        List<Project> projects = projectRepository.findByTeamContainingOrOwner(user, user);

        if (category != null) {
            projects = projects.stream()
                    .filter(project -> project.getCategory().equals(category))
                    .collect(Collectors.toList());
        }

        if (tag != null) {
            projects = projects.stream()
                    .filter(project -> project.getTags().contains(tag))
                    .collect(Collectors.toList());
        }

        return projects;
    }

    @Override
    public void deleteProject(Long id, long userId) throws Exception {
        getProjectById(id);

        projectRepository.deleteById(id);
    }

    @Override
    public Project updateProject(Project project, Long id) throws Exception {
        Project updatedProject = getProjectById(id);

        updatedProject.setName(project.getName());
        updatedProject.setTags(project.getTags());
        updatedProject.setDescription(project.getDescription());
        updatedProject.setCategory(project.getCategory());

        return projectRepository.save(updatedProject);
    }

    @Override
    public void addUserToProject(Long projectId, Long userId) throws Exception {
        Project project = getProjectById(projectId);
        User user = userService.findUserById(userId);
        if (!project.getTeam().contains(user)) {
            project.getChat().getUsers().add(user);
            project.getTeam().add(user);
        }

        projectRepository.save(project);

    }

    @Override
    public void removeUserFromProject(Long projectId, Long userId) throws Exception {
        Project project = getProjectById(projectId);
        User user = userService.findUserById(userId);
        if (project.getTeam().contains(user)) {
            project.getChat().getUsers().remove(user);
            project.getTeam().remove(user);
        }

        projectRepository.save(project);
    }

    @Override
    public Chat getChatProjectId(Long projectId) throws Exception {
        Project project = getProjectById(projectId);

        return project.getChat();
    }

    @Override
    public List<Project> searchProject(String keyWord, User user) {
        return projectRepository.findByNameContainingAndTeamContains(keyWord, user);
    }
}
