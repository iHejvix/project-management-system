package com.hejvix.ProjectManagmentSystem.repositry;

import com.hejvix.ProjectManagmentSystem.modal.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Invitation findByToken(String token);

    Invitation findByEmail(String userEmail);
}
