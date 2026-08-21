package com.Smart.Erp.DTO.Admin.Classes;

import lombok.Data;
import lombok.*;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SectionCreationRequest {
    String name;
    String roomNumber;
    int capacity;
}
