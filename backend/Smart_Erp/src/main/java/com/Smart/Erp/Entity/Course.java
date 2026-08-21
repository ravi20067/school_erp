package com.Smart.Erp.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;

    private String courseCode;

    @OneToMany(mappedBy = "course")
    private List<Section> sections;

    @OneToMany(mappedBy = "course")
    private List<Subject> subjects;
}
