package com.Smart.Erp.Controller.Admin;

import com.Smart.Erp.DTO.Admin.Student.AdminStudentStatsDTO;
import com.Smart.Erp.DTO.Admin.Student.StudentDTO;
import com.Smart.Erp.Entity.Student;
import com.Smart.Erp.Service.StudentService;
import com.Smart.Erp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/student")
public class StudentController {
    @Autowired
    private UserService userService;

    @Autowired
    private StudentService adminService;


    @GetMapping("/classes")
    public ResponseEntity<List<String>> getClasses() {

        return ResponseEntity.ok(adminService.getClasses());
    }

    @PostMapping("/add")
    public ResponseEntity<?> saveStudent(@RequestBody StudentDTO studentDTO){

        Student student = userService.addstudent(studentDTO);
        return ResponseEntity.ok(adminService.convertToStudentDTO(student));
    }

    @GetMapping("/stats")
    public AdminStudentStatsDTO getStats() {
        return adminService.getDashboardStats();
    }

    @GetMapping("/sections")
    public ResponseEntity<List<String>> loadSections(
            @RequestParam("class") String schoolClass) {

        return ResponseEntity.ok(adminService.getSections(schoolClass));
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentDTO>> loadStudents(

            @RequestParam(required = false) String search,

            @RequestParam(value = "class", required = false)
            String schoolClass,

            @RequestParam(required = false)
            String section
    ) {

        List<StudentDTO> students =
                adminService.loadStudents(search, schoolClass, section);

        return ResponseEntity.ok(students);
    }
}
