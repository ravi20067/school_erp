package com.School.Management.Entity;

import com.School.Management.Enum.Sections;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Sections sectionName;

    private Integer totalStudents;
    @ManyToOne
    @JoinColumn(name = "class_id")
    private SchoolClass schoolClass;
}
