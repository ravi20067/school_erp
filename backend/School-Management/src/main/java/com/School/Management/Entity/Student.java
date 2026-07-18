package com.School.Management.Entity;


import com.School.Management.Enum.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "students")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String admissionNo;
    private String firstName;
    private String lastName;

    private String gender;
    private LocalDate dateOfBirth;

    private String email;
    private String phone;

    private String address;

    private Integer rollNumber;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate admissionDate;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private SchoolClass schoolClass;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;


    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}
