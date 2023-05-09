package com.example.demo.persistence;


import org.springframework.data.repository.CrudRepository;

import com.example.demo.domain.FileVO;

public interface FileRepo extends CrudRepository<FileVO, Integer> {

}
