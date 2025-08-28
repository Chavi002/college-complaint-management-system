package com.chavi.college_complaint_system.repository;

import com.chavi.college_complaint_system.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByStudent_Id(Long studentId);
    List<Complaint> findByStatus(String status);
    List<Complaint> findByStudent_IdAndStatus(Long studentId, String status);
}
