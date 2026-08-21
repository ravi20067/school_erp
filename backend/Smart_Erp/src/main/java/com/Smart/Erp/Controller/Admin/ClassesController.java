package com.Smart.Erp.Controller.Admin;

import com.Smart.Erp.DTO.Admin.Classes.*;
import com.Smart.Erp.Service.AcademicYearService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/academic-years")
@RequiredArgsConstructor
public class ClassesController {

    @Autowired
    private AcademicYearService academicYearService;

    @PostMapping
    public ResponseEntity<AcademicYearResponse> createAcademicYear(
            @RequestBody AcademicYearRequest request
    ) {

        AcademicYearResponse response =
                academicYearService.createAcademicYear(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<AcademicYearResponse>> getAcademicYear(){
        List<AcademicYearResponse> response =
                academicYearService.getAcademicYear();
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<TeacherResponse>> getTeachers(){
        List<TeacherResponse> responses =
                academicYearService.getAllTeachers();
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(responses);
    }

    @PostMapping("/classes")
    public ResponseEntity<?> createClass(
            @RequestBody ClassCreationRequest classCreationRequest
            ){
        academicYearService.createClass(classCreationRequest);

        return ResponseEntity
                .status(HttpStatus.OK).build();
    }

    @PostMapping("/classes/{classId}/sections")
    public ResponseEntity<?> createSection(
            @PathVariable Long classId,
            @RequestBody SectionCreationRequest sectionCreationRequest
            ){
        academicYearService.createSection(sectionCreationRequest,classId);

        return ResponseEntity
                .status(HttpStatus.CREATED).build();
    }

    @PutMapping("/sections/{sectionId}/teacher")
    public ResponseEntity<?> assignTeacher(
            @PathVariable Long sectionId,
            @RequestBody AssignTeacherRequest request) {

        academicYearService.assignTeacher(
                sectionId,
                request.getTeacherId()
        );

        return ResponseEntity.ok().build();
    }

    @GetMapping("/classes")
    public ResponseEntity<List<ClassResponse>> getClassesByAcademicYearId(
            @RequestParam Long academicYearId
    ){

        List<ClassResponse> responses = academicYearService.getClassesByAcademicId(academicYearId);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responses);

    }

    @DeleteMapping("/classes/{classId}")
    public ResponseEntity<?> deleteClass(
            @PathVariable Long classId
    ){
        academicYearService.deleteClass(classId);

        return ResponseEntity
                .status(HttpStatus.OK).build();
    }

    @DeleteMapping("section/{sectionId}")
    public ResponseEntity<?> deleteSection(
            @PathVariable Long sectionId
    ){
        academicYearService.deleteSection(sectionId);

        return ResponseEntity
                .status(HttpStatus.OK).build();
    }

    @PostMapping("/{yearId}/copy-structure")
    public ResponseEntity<?> copyStructure(
            @PathVariable Long yearId
    ){
        academicYearService.copyStructure(yearId);
        return ResponseEntity
                .status(HttpStatus.OK).build();
    }
    @PutMapping("/{yearId}/current")
    public ResponseEntity<?> switchToCurrentSession(
            @PathVariable Long yearId
    ) {
        academicYearService.switchToCurrentSession(yearId);

        return ResponseEntity.ok().build();
    }

}
