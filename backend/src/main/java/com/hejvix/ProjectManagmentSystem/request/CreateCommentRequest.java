package com.hejvix.ProjectManagmentSystem.request;

import lombok.Data;

@Data
public class CreateCommentRequest {
    private Long senderId;
    private String content;
    private Long projectId;
    private Long issueId;
}

