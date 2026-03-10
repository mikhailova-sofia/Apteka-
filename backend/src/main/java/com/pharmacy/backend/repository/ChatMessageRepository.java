package com.pharmacy.backend.repository;

import com.pharmacy.backend.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    List<ChatMessage> findByRoomIdOrderByTimestampAsc(String roomId);

    @Query("SELECT DISTINCT c.roomId FROM ChatMessage c WHERE c.roomId IS NOT NULL")
    List<String> findDistinctRoomIds();
}