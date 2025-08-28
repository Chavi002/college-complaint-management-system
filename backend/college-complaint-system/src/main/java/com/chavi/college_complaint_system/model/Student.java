package com.chavi.college_complaint_system.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "student")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length= 100)
    private String name;

    @Column(unique = true)
    private String enrollmentNumber;

    @Column(name = "Email", nullable = false, unique = true, length = 100)//unique
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false, length = 225)
    private String password;

    @Column(nullable = false, length = 100)
    private String branch;

    @Column(name = "Contact_Number", nullable = false)
    private String contactNumber;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Complaint> complaints = new ArrayList<>();

    public Student(){}
        public Long getId(){
        return id;
        }
        public void setId(Long id){
        this.id =id;
        }

        public String getName(){
        return name;
        }
        public void setName(String name){
        this.name = name;
        }

        public String getEnrollmentNumber() {
        return enrollmentNumber;
        }
        public void setEnrollmentNumber(String enrollmentNumber) {
        this.enrollmentNumber = enrollmentNumber;
        }

        public String getEmail(){
        return email;
        }
        public void setEmail(String email){
        this.email= email;
        }

        public String getPassword(){
        return password;
        }

        public void setPassword(String password){
        this.password = password;
        }

        public String getBranch(){
        return branch;
        }
        public void setBranch(String branch) {
        this.branch = branch;
        }

        public String getContactNumber(){
        return contactNumber;
        }
        public void setContactNumber(String contactNumber){
        this.contactNumber = contactNumber;
        }

        public List<Complaint> getComplaints(){
        return complaints;
        }
        public void setComplaints(List<Complaint> complaints){
        this.complaints = complaints;
        }
}
