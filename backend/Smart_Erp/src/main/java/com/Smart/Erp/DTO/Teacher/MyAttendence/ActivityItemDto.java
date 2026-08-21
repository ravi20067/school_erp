package com.Smart.Erp.DTO.Teacher.MyAttendence;

import com.Smart.Erp.Enum.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityItemDto {

    private Long id;

    private String title;

    private String description;

    private String time;

    private ActivityType type;
}
