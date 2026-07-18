package com.School.Management.DTO;

import com.School.Management.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {

    private Long id;

    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String profileImage;

}
