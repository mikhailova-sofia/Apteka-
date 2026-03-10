package com.pharmacy.backend.controller;

import com.pharmacy.backend.model.ChatMessage;
import com.pharmacy.backend.model.User;
import com.pharmacy.backend.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageRepository repository;

    @GetMapping("/rooms")
    public List<String> getRooms(@AuthenticationPrincipal User user) {
        if ("ADMIN".equals(user.getRole().name())) {
            return repository.findDistinctRoomIds();
        }
        return List.of(user.getUsername());
    }

    @GetMapping("/{roomId}")
    public List<ChatMessage> getMessages(@PathVariable String roomId, @AuthenticationPrincipal User user) {
        if ("ADMIN".equals(user.getRole().name()) || roomId.equals(user.getUsername())) {
            return repository.findByRoomIdOrderByTimestampAsc(roomId);
        }
        throw new RuntimeException("Доступ запрещен");
    }

    @PostMapping("/{roomId}")
    public ChatMessage sendMessage(@PathVariable String roomId, @RequestBody ChatMessage message, @AuthenticationPrincipal User user) {
        if (!"ADMIN".equals(user.getRole().name()) && !roomId.equals(user.getUsername())) {
            throw new RuntimeException("Доступ запрещен");
        }
        message.setRoomId(roomId);
        message.setSender(user.getUsername());
        message.setRole(user.getRole().name());
        message.setTimestamp(java.time.LocalDateTime.now());
        return repository.save(message);
    }
}