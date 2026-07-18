package com.School.Management.Controller.Teacher;

import com.School.Management.DTO.Teacher.MyAttendence.ActivityItemDto;
import com.School.Management.DTO.Teacher.MyAttendence.QRCodeResponseDto;
import com.School.Management.DTO.Teacher.MyAttendence.TodayAttendanceDto;
import com.School.Management.Service.TeacherAttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher/my-attendance")
@RequiredArgsConstructor
public class MyAttendence {

    private final TeacherAttendanceService teacherAttendanceService;

    /**
     * Generate QR Code
     */
    @PostMapping("/qr/generate")
    public ResponseEntity<QRCodeResponseDto> generateQr() {

        return ResponseEntity.ok(
                teacherAttendanceService.generateQr()
        );
    }

    /**
     * Refresh QR Code
     */
    @PostMapping("/qr/refresh")
    public ResponseEntity<QRCodeResponseDto> refreshQr() {

        return ResponseEntity.ok(
                teacherAttendanceService.refreshQr()
        );
    }

    /**
     * Today's Attendance
     */
    @GetMapping("/today")
    public ResponseEntity<TodayAttendanceDto> getTodayAttendance() {

        return ResponseEntity.ok(
                teacherAttendanceService.getTodayAttendance()
        );
    }

    /**
     * Recent Activity
     */
    @GetMapping("/activity")
    public ResponseEntity<List<ActivityItemDto>> getRecentActivity() {

        return ResponseEntity.ok(
                teacherAttendanceService.getRecentActivity()
        );
    }

}