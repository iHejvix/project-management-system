package com.hejvix.ProjectManagmentSystem.repositry;

import com.hejvix.ProjectManagmentSystem.modal.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByProjectId(Long projectId);
}
