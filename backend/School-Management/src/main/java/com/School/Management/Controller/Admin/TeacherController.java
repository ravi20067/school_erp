package com.School.Management.Controller.Admin;

import com.School.Management.DTO.Admin.Teacher.AdminTeacherStatsDTO;
import com.School.Management.DTO.Admin.Teacher.TeacherDto;
import com.School.Management.Entity.Teacher;
import com.School.Management.Enum.Status;
import com.School.Management.Service.TeacherService;
import com.School.Management.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final UserService userService;

    private final TeacherService teacherService;

    @GetMapping("/stats")
    public ResponseEntity<AdminTeacherStatsDTO> getTeacherStats() {
        return ResponseEntity.ok(teacherService.getTeacherStats());
    }

    @GetMapping("/teachers")
    public ResponseEntity<TeacherDto> getTeachers(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(required = false) Status status
    ) {
        return ResponseEntity.ok(
                teacherService.getTeachers(search, status)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherDto> getTeacherById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                teacherService.getTeacherById(id)
        );
    }

    @PostMapping("/add")
    public ResponseEntity<TeacherDto> addTeacher(
            @RequestBody TeacherDto teacherDto
    ) {

        Teacher teacher =  userService.addTeacherUser(teacherDto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(teacherService.convertToDTO(teacher));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TeacherDto> updateTeacher(
            @PathVariable Long id,
            @RequestBody TeacherDto teacherDto
    ) {
        return ResponseEntity.ok(
                teacherService.updateTeacher(id, teacherDto)
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTeacher(
            @PathVariable Long id
    ) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.ok("Teacher deleted successfully.");
    }

}