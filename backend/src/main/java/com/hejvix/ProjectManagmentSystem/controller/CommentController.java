package com.hejvix.ProjectManagmentSystem.controller;

import com.hejvix.ProjectManagmentSystem.modal.Comment;
import com.hejvix.ProjectManagmentSystem.modal.User;
import com.hejvix.ProjectManagmentSystem.request.CreateCommentRequest;
import com.hejvix.ProjectManagmentSystem.response.MessageResponse;
import com.hejvix.ProjectManagmentSystem.service.CommentService;
import com.hejvix.ProjectManagmentSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;

    @Autowired
    public CommentController(CommentService commentService, UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity<Comment> createComment(@RequestBody CreateCommentRequest request,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        commentService.createComment(request.getIssueId(), user.getId(), request.getContent());
        return new ResponseEntity<>(commentService.createComment(
                request.getIssueId(),
                user.getId(),
                request.getContent()), HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@RequestHeader("Authorization") String jwt,
                                                 @PathVariable Long commentId) throws Exception {
        commentService.deleteComment(commentId, userService.findUserByJwt(jwt).getId());

        MessageResponse message = new MessageResponse();
        message.setMessage("Comment deleted successfully");
        return ResponseEntity.ok(message);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long issueId) {
        return ResponseEntity.ok(commentService.findCommentByIssueId(issueId));
    }
}
