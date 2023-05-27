package com.example.demo.persistence;


import org.springframework.data.jpa.repository.JpaRepository;


import com.example.demo.domain.DA_LOG;


public interface DALogRepo extends JpaRepository<DA_LOG, Integer> {

}
