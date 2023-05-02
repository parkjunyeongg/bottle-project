package com.example.demo.persistence;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.domain.MemberVO;

public interface MemberRepo extends CrudRepository<MemberVO, String> {

}
