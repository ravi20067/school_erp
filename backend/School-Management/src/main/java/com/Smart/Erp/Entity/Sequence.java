package com.School.Management.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sequence")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Sequence {
    @Id
    private String year;
    private Integer CurrentValue;
}
