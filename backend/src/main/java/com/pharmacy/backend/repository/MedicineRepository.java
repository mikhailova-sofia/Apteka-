package com.pharmacy.backend.repository;

import com.pharmacy.backend.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Integer> {

    @Query("SELECT m FROM Medicine m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(m.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Medicine> searchByNameOrDescription(@Param("search") String search);

    List<Medicine> findByArrivalDateAfterOrderByArrivalDateAsc(LocalDate date);
}