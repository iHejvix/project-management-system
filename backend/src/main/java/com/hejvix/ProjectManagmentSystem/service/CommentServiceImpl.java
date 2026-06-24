package com.hejvix.ProjectManagmentSystem.service;

import com.hejvix.ProjectManagmentSystem.modal.Comment;
import com.hejvix.ProjectManagmentSystem.modal.Issue;
import com.hejvix.ProjectManagmentSystem.modal.User;
import com.hejvix.ProjectManagmentSystem.repositry.CommentRepository;
import com.hejvix.ProjectManagmentSystem.repositry.IssueRepository;
import com.hejvix.ProjectManagmentSystem.repositry.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, IssueRepository issueRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Comment createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> issue = issueRepository.findById(issueId);
        Optional<User> user = userRepository.findById(userId);

        if (issue.isEmpty() || user.isEmpty()) {
            throw new Exception("Issue or User not found");
        }

        Comment comment = new Comment();
        comment.setIssue(issue.get());
        comment.setUser(user.get());
        comment.setContent(content);
        comment.setCreatedDataTime(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);
        issue.get().getComments().add(savedComment);

        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comment> comment = commentRepository.findById(commentId);
        Optional<User> user = userRepository.findById(userId);

        if (comment.isEmpty() || user.isEmpty()) {
            throw new IllegalArgumentException("Comment or user not found");
        }

        if (comment.get().getUser().equals(user.get())) {
            commentRepository.delete(comment.get());
        } else {
            throw new Exception("Comment is not part of the user");
        }
    }

    @Override
    public List<Comment> findCommentByIssueId(Long issueId) {
        return commentRepository.findByIssueId(issueId);
    }
}
