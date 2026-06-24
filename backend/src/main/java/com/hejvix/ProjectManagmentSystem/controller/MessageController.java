package com.hejvix.ProjectManagmentSystem.controller;

import com.hejvix.ProjectManagmentSystem.modal.Message;
import com.hejvix.ProjectManagmentSystem.request.CreateMessageRequest;
import com.hejvix.ProjectManagmentSystem.service.MessageService;
import com.hejvix.ProjectManagmentSystem.service.ProjectService;
import com.hejvix.ProjectManagmentSystem.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;
    private final UserService userService;
    private final ProjectService projectService;

    public MessageController(MessageService messageService, UserService userService, ProjectService projectService) {
        this.messageService = messageService;
        this.userService = userService;
        this.projectService = projectService;
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody CreateMessageRequest request) throws Exception {
        userService.findUserById(request.getSenderId());

        if (projectService.getProjectById(request.getProjectId()).getChat() == null) {
            throw new Exception("Chat not found");
        }
        return ResponseEntity.ok(messageService.sendMessage(request.getSenderId(),
                request.getProjectId(), request.getContent()));
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessages(@PathVariable("projectId") Long projectId) throws Exception {
        return ResponseEntity.ok(messageService.getMessagesByProjectId(projectId));
    }
}
