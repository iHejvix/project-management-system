package com.hejvix.ProjectManagmentSystem.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
    //Fields are private because @Data annotated consists getter and setter. Similar to lombok
}
