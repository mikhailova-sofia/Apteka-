package com.pharmacy.backend;

import com.pharmacy.backend.model.Medicine;
import com.pharmacy.backend.model.Role;
import com.pharmacy.backend.model.User;
import com.pharmacy.backend.repository.MedicineRepository;
import com.pharmacy.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner dataLoader(UserRepository userRepository, MedicineRepository medicineRepository, PasswordEncoder encoder) {
		return args -> {
			if (!userRepository.findByUsername("admin").isPresent()) {
				userRepository.save(User.builder()
						.username("admin")
						.password(encoder.encode("admin123"))
						.role(Role.ADMIN)
						.build());
			}

			if (medicineRepository.count() == 0) {
				medicineRepository.save(new Medicine(null, "Аспирин", "Обезболивающее, жаропонижающее средство", 150.0, 100, LocalDate.of(2026, 3, 15), "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"));
				medicineRepository.save(new Medicine(null, "Парацетамол", "Жаропонижающее", 80.0, 200, LocalDate.of(2026, 3, 20), "https://images.unsplash.com/photo-1550572017-edb799632873?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"));
				medicineRepository.save(new Medicine(null, "Ибупрофен", "Жаропонижающее, противовоспалительное", 120.0, 50, LocalDate.of(2026, 4, 1), "https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"));
			}
		};
	}
}