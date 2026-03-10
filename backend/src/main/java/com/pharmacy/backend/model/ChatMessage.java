package com.pharmacy.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String roomId; // Имя пользователя (клиента) выступает в роли ID комнаты
    private String sender;
    private String role; // "USER" или "ADMIN"
    private String content;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}