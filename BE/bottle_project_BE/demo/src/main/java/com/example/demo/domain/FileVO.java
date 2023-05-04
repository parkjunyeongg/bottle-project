package com.example.demo.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@Setter
@ToString
public class FileVO {
	@Id
	@GeneratedValue
	private Integer id;
	private String OriginalFileName;
	private String FilePath;	
	private String SavedFileName;
	@CreatedDate
	private LocalDateTime createdDate;

}
