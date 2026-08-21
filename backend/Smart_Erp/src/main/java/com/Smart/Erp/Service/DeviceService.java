package com.Smart.Erp.Service;

import com.Smart.Erp.DTO.Admin.DeviceDto;
import com.Smart.Erp.Entity.Devices;
import com.Smart.Erp.Repository.DeviceRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Transactional
public class DeviceService {

    private final DeviceRepo deviceRepo;

    public @Nullable List<DeviceDto> getDevices() {
        return deviceRepo.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public @Nullable DeviceDto getDevice(Long id) {
        return convertToDTO(deviceRepo.findById(id).orElseThrow());
    }

    public @Nullable DeviceDto updateDevice(Long id, DeviceDto deviceDto) {
        return DeviceDto.builder().build();
    }

    public void deleteDevice(Long id) {

    }

    public @Nullable DeviceDto convertToDTO(Devices devices) {
        return DeviceDto.builder()
                .id(devices.getId())
                .deviceEPid(devices.getDeviceEPid())
                .location(devices.getLocation())
                .password(devices.getPassword())
                .status(devices.getStatus())
                .build();
    }
}
