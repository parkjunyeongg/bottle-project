package com.example.demo.domain;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@Entity
public class MemberVO {
	@Id
	@GeneratedValue
	private int num;	
	private String name;
	private String email;
	private String newid;
	private String newpw;
	
	


//	@Override
//	public String toString() {
//		return "Member [num=" + num + ", name=" + name + ", pass=" + newpw+"]";
//	}
	
}