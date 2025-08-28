// AdminRepository.java
package com.chavi.college_complaint_system.repository;

import com.chavi.college_complaint_system.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}
