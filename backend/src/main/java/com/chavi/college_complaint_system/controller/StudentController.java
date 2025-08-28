package com.chavi.college_complaint_system.controller;

import com.chavi.college_complaint_system.model.Student;
import com.chavi.college_complaint_system.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    private String generateEnrollmentNumber() {
        String prefix = "DIT";
        String year = String.valueOf(java.time.Year.now().getValue()).substring(2);

        long timestamp = System.currentTimeMillis();
        String timePart = String.valueOf(timestamp).substring(8);

        return prefix + year + timePart;
    }

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Student student) {
        String email = student.getEmail();
        String password = student.getPassword();

        // Check if student exists by email
        Student existingStudent = studentRepository.findByEmail(email);
        if (existingStudent == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
        }

        // Compare passwords
        if (!passwordEncoder.matches(password, existingStudent.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
        }

        // on success, return id and email
        Map<String, Object> response = new HashMap<>();
        response.put("id", existingStudent.getId());
        response.put("email", existingStudent.getEmail());
        response.put("name", existingStudent.getName());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody Student student) {
        if (studentRepository.findByEmail(student.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        student.setEnrollmentNumber(generateEnrollmentNumber());
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepository.save(student);

        return ResponseEntity.ok("Student registered successfully");
    }


}
