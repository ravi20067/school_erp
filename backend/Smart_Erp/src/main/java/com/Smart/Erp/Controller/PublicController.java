package com.Smart.Erp.Controller;

import com.Smart.Erp.DTO.Admin.Student.StudentDTO;
import com.Smart.Erp.DTO.Admin.Teacher.TeacherDto;
import com.Smart.Erp.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/services")
public class PublicController {

    @Autowired
    private UserService userService;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @PostMapping("/student/add")
    public ResponseEntity<?> saveStudent(@RequestBody StudentDTO student){

        return ResponseEntity.ok(userService.addstudent(student));
    }

    @PostMapping("/admin/add")
    public ResponseEntity<?> saveStudent(@RequestBody TeacherDto teacher){

        return ResponseEntity.ok(userService.addTeacherUser(teacher));
    }
    @GetMapping("/redis")
    public String testRedis() {

        stringRedisTemplate.opsForValue().set("hello", "world");

        return stringRedisTemplate.opsForValue().get("hello");
    }

}
