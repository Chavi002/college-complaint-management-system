
package com.chavi.college_complaint_system.repository;

import com.chavi.college_complaint_system.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findTopByOrderByIdDesc();
    Student findByEmail(String email);
}
