package com.hejvix.ProjectManagmentSystem.modal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    private String status;
    private String projectName;
    private String priority;
    private LocalDate dueDate;

    @ElementCollection //if it may not be necessary
    private List<String> tags = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "issue", cascade = CascadeType.ALL, orphanRemoval = true) //mappedBy use to take a field with
    private List<Comment> comments = new ArrayList<>();                             //Comment class and don't create separate table

    private LocalDateTime localDateTime;

    @ManyToOne
    private User user;

    @ManyToOne
    private User assignee;

    @JsonIgnore
    @ManyToOne
    private Project project;

}
