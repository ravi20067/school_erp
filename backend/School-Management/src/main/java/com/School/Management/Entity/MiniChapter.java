package com.School.Management.Entity;


import com.School.Management.Enum.Role;
import com.School.Management.Enum.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mini_chapters")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MiniChapter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private Integer sequenceNumber;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chapter_id", nullable = false)
    private Chapter chapter;

    @OneToOne(mappedBy = "miniChapter", cascade = CascadeType.ALL)
    private StudyMaterial studyMaterial;

    @OneToMany(mappedBy = "miniChapter")
    private List<Question> questions;
}
