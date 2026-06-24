package com.hejvix.ProjectManagmentSystem.repositry;

import com.hejvix.ProjectManagmentSystem.modal.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatIdOrderByCreatedAtAsc(Long chatId);
}
