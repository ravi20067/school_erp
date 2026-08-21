package com.Smart.Erp.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Table(name = "question_banks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionBank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false, unique = true)
    private Subject subject;

    @OneToMany(mappedBy = "questionBank")
    private List<Question> questions;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private Teacher assignedTeacher;
}
