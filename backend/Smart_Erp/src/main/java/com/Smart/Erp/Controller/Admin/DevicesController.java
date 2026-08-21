package com.Smart.Erp.Controller.Admin;

import com.Smart.Erp.DTO.Admin.DeviceDto;
import com.Smart.Erp.Entity.Devices;
import com.Smart.Erp.Service.DeviceService;
import com.Smart.Erp.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/device")
@RequiredArgsConstructor
public class DevicesController {

    private final DeviceService deviceService;

    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<DeviceDto> addDevice(
            @RequestBody DeviceDto deviceDto
    ) {
        Devices devices = userService.addDevice(deviceDto);
        return ResponseEntity.ok(deviceService.convertToDTO(devices));
    }

    @GetMapping("/get_devices")
    public ResponseEntity<List<DeviceDto>> getDevices() {
        return ResponseEntity.ok(deviceService.getDevices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeviceDto> getDevice(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(deviceService.getDevice(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeviceDto> updateDevice(
            @PathVariable Long id,
            @RequestBody DeviceDto deviceDto
    ) {
        return ResponseEntity.ok(deviceService.updateDevice(id, deviceDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDevice(
            @PathVariable Long id
    ) {
        deviceService.deleteDevice(id);
        return ResponseEntity.ok("Device deleted successfully.");
    }
}