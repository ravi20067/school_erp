package com.Smart.Erp.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "study_materials")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String fileUrl;

    private String fileType;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mini_chapter_id", nullable = false, unique = true)
    private MiniChapter miniChapter;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false, unique = true)
    private Teacher assignedTeacher;
}
