package com.chavi.college_complaint_system.controller;

import com.chavi.college_complaint_system.model.Complaint;
import com.chavi.college_complaint_system.model.Student;
import com.chavi.college_complaint_system.repository.ComplaintRepository;
import com.chavi.college_complaint_system.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:3000")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private StudentRepository studentRepository;

    // POST API to create complaint with student reference
    @PostMapping
    public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint) {
        Long studentId = complaint.getStudent().getId();

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        complaint.setStudent(student);

        Complaint savedComplaint = complaintRepository.save(complaint);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComplaint);
    }

    //This is for admin to get all complaint
    @GetMapping
    public ResponseEntity<List<Complaint>> getComplaints(@RequestParam(required = false) String status) {
        if (status != null && !status.isEmpty()) {
            return ResponseEntity.ok(complaintRepository.findByStatus(status));
        } else {
            return ResponseEntity.ok(complaintRepository.findAll());
        }
    }

    // GET API to fetch all complaints by student ID
    @GetMapping("/student/{id}")
    public ResponseEntity<List<Complaint>> getComplaintsByStudentId(
            @PathVariable long id,
            @RequestParam(required = false) String status) {

        if (status != null && !status.isEmpty() && !status.equalsIgnoreCase("All")) {
            return ResponseEntity.ok(
                    complaintRepository.findByStudent_IdAndStatus(id, status)
            );
        } else {
            return ResponseEntity.ok(
                    complaintRepository.findByStudent_Id(id)
            );
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateComplaintStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));

        // Get new status from request body
        String newStatus = request.get("status");

        // Update the status
        complaint.setStatus(newStatus);

        // Save updated complaint to DB
        Complaint updatedComplaint = complaintRepository.save(complaint);

        return ResponseEntity.ok(updatedComplaint);
    }
}
