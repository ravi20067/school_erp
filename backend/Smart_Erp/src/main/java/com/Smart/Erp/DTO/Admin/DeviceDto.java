package com.Smart.Erp.DTO.Admin;

import com.Smart.Erp.Enum.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeviceDto {

    private Long id;

    private String deviceEPid;

    private String location;

    private String password;

    private Status status;
}
