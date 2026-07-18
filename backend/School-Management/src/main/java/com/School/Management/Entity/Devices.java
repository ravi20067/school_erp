package com.School.Management.Entity;

import com.School.Management.Enum.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "devices")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Devices {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceEPid;
    private String Location;

    private Status status;

    private String password;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
