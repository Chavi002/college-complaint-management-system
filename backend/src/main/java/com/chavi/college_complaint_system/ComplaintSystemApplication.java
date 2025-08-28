package com.chavi.college_complaint_system;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
@EnableJpaAuditing
@SpringBootApplication
public class ComplaintSystemApplication {
	public static void main(String[] args) {
		SpringApplication.run(ComplaintSystemApplication.class, args);
	}
}



