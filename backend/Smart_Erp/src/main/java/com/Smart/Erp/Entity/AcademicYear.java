package com.Smart.Erp.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(
        name = "academic_years",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "name")
        }
)
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AcademicYear {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private LocalDate startDate;

    private LocalDate endDate;

    private Boolean current = false;

    private Boolean active = true;
}
