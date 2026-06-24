package com.hejvix.ProjectManagmentSystem.service;

import com.hejvix.ProjectManagmentSystem.modal.Issue;
import com.hejvix.ProjectManagmentSystem.modal.User;
import com.hejvix.ProjectManagmentSystem.request.IssueRequest;

import java.util.List;

public interface IssueService {
    Issue getIssueById(Long issueId) throws Exception;

    List<Issue> getIssueByProjectId(Long projectId) throws Exception;

    Issue createIssue(IssueRequest issue, User user) throws Exception;

    void deleteIssue(Long issueId, Long userId) throws Exception;

    Issue addUserToIssue(Long issueId, Long userId) throws Exception;

    Issue updateStatus(Long issueId, String status) throws Exception;
    Issue updateIssue(Long issueId, IssueRequest issueRequest) throws Exception;
}
