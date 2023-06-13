package com.example.demo.persistence;


import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import com.example.demo.domain.DA_LOG;



public interface DALogRepo extends JpaRepository<DA_LOG, Integer> {

	Page<DA_LOG> findByName(String name, Pageable pageable);

	Page<DA_LOG> findBycreatedDateBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);


}
