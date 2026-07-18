package com.School.Management.Repository;

import com.School.Management.Entity.Devices;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepo extends JpaRepository<Devices,Long> {
    boolean existsBydeviceEPid(String deviceEPid);
}
