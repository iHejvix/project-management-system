package com.hejvix.ProjectManagmentSystem.controller;

import com.hejvix.ProjectManagmentSystem.modal.Chat;
import com.hejvix.ProjectManagmentSystem.modal.Invitation;
import com.hejvix.ProjectManagmentSystem.modal.Project;
import com.hejvix.ProjectManagmentSystem.modal.User;
import com.hejvix.ProjectManagmentSystem.request.InviteRequest;
import com.hejvix.ProjectManagmentSystem.response.MessageResponse;
import com.hejvix.ProjectManagmentSystem.service.InvitationService;
import com.hejvix.ProjectManagmentSystem.service.ProjectService;
import com.hejvix.ProjectManagmentSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;
    private final InvitationService invitationService;

    @Autowired
    public ProjectController(ProjectService projectService, UserService userService, InvitationService invitationService) {
        this.projectService = projectService;
        this.userService = userService;
        this.invitationService = invitationService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String tag,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<Project> projects = projectService.getProjectByTeam(user, category, tag);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectsById(
                @PathVariable Long projectId, @RequestHeader("Authorization") String jwt) throws Exception {
        userService.findUserByJwt(jwt);
        Project project = projectService.getProjectById(projectId);
        return ResponseEntity.ok(project);
    }

    @PostMapping()
    public ResponseEntity<Project> createProject(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Project project
    ) throws Exception {
        System.out.println("PROJECT " + project.getTags());
        User user = userService.findUserByJwt(jwt);
        Project createdProject = projectService.createProject(project, user);
        return ResponseEntity.ok(createdProject);
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt,
            @RequestBody Project project
    ) throws Exception {
        userService.findUserByJwt(jwt);
        Project updateProject = projectService.updateProject(project, projectId);
        return ResponseEntity.ok(updateProject);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<MessageResponse> deleteProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwt(jwt);
        projectService.deleteProject(projectId, user.getId());
        MessageResponse messageResponse = new MessageResponse("Project deleted successfully");
        return ResponseEntity.ok(messageResponse);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects (
            @RequestParam(required = false) String keyword,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        List<Project> projects = projectService.searchProject(keyword, user);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatByProjectId(
            @PathVariable Long projectId, @RequestHeader("Authorization") String jwt) throws Exception {
        userService.findUserByJwt(jwt);
        Chat chat = projectService.getChatProjectId(projectId);
        return ResponseEntity.ok((chat));
    }

    @PostMapping("/invite")
    public ResponseEntity<MessageResponse> inviteProject(
            @RequestBody InviteRequest inviteRequest,
            @RequestHeader("Authorization") String jwt
            ) throws Exception {
        userService.findUserByJwt(jwt);
        invitationService.sendInvitation(inviteRequest.getEmail(), inviteRequest.getProjectId());
        MessageResponse response = new MessageResponse("Invitation sent successfully");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation> acceptInviteProject(
            @RequestParam String token,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwt(jwt);
        Invitation invitation = invitationService.acceptInvitation(token, user.getId());
        projectService.addUserToProject(invitation.getProjectId(), user.getId());

        return new ResponseEntity<>(invitation, HttpStatus.ACCEPTED);
    }

}
