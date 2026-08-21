package com.School.Management.Controller;

import com.School.Management.DTO.Teacher.MyAttendence.AttendanceScanRequest;
import com.School.Management.DTO.Teacher.MyAttendence.AttendanceScanResponseDto;
import com.School.Management.Entity.User;
import com.School.Management.Service.TeacherAttendanceService;
import com.School.Management.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/devices")
@RequiredArgsConstructor
public class ScannerController {

    private final TeacherAttendanceService teacherAttendanceService;
    private final UserService userService;

    @PostMapping("/mark")
    public ResponseEntity<AttendanceScanResponseDto> verifyQr(

            @RequestBody AttendanceScanRequest request,
            Authentication authentication

    ) {
        String username = authentication.getName();
        User user = userService.getUser(username);
        return ResponseEntity.ok(

                teacherAttendanceService.verifyQr(
                        request,
                        user.getDevices().getLocation()
                )

        );

    }

}