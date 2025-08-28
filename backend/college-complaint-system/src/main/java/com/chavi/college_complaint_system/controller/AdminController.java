package com.chavi.college_complaint_system.controller;

import com.chavi.college_complaint_system.model.Admin;
import com.chavi.college_complaint_system.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Example: get admin profile by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable Long id) {
        Admin admin = adminRepository.findById(id).orElse(null);
        if (admin == null) {
            return ResponseEntity.status(404).body("Admin not found");
        }

        // avoid returning full password, only required fields
        Map<String, Object> response = new HashMap<>();
        response.put("id", admin.getId());
        response.put("name", admin.getName());
        response.put("email", admin.getEmail());

        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        String email = admin.getEmail();
        String password = admin.getPassword();

        // Check if admin exists by email
        Admin existingAdmin = adminRepository.findByEmail(email);
        if (existingAdmin == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
        }

        // Compare passwords using PasswordEncoder
        if (!passwordEncoder.matches(password, existingAdmin.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
        }
        //If login is successful, return id and email only
        Map<String, Object> response = new HashMap<>();
        response.put("id", existingAdmin.getId());
        response.put("email", existingAdmin.getEmail());
        response.put("name", existingAdmin.getName());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
