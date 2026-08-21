package com.Smart.Erp.Service;


import com.Smart.Erp.DTO.Admin.Classes.*;
import com.Smart.Erp.Entity.*;
import com.Smart.Erp.Repository.AcademicYearRepository;
import com.Smart.Erp.Repository.ClassRepo;
import com.Smart.Erp.Repository.SectionRepo;
import com.Smart.Erp.Repository.TeacherRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AcademicYearService {

    private final AcademicYearRepository academicYearRepository;

    private final TeacherRepo teacherRepo;

    private final ClassRepo classesRepo;

    private final SectionRepo sectionRepo;

    public AcademicYearResponse createAcademicYear(
            AcademicYearRequest request
    ) {

        // Prevent duplicate academic year
        if (academicYearRepository.existsByName(request.getName())) {
            throw new RuntimeException(
                    "Academic year already exists: " + request.getName()
            );
        }

        AcademicYear academicYear = AcademicYear.builder()
                .name(request.getName())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .current(false)
                .active(true)
                .build();

        AcademicYear savedAcademicYear =
                academicYearRepository.save(academicYear);

        return mapToResponse(savedAcademicYear);
    }


    public List<AcademicYearResponse> getAcademicYear() {

        List <AcademicYear> response = academicYearRepository.findAll();
        return response.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TeacherResponse> getAllTeachers() {
        List <Teacher> response = teacherRepo.findAll();
        return response.stream()
                .map(this::mapToResponse)
                .toList();
    }


    public void createClass(ClassCreationRequest classCreationRequest) {

        List<ClassEntity> classEntities = classesRepo.findByClassNameAndAcademicYear_Id(classCreationRequest.getName(),classCreationRequest.getAcademicYearId());

        if (classEntities.isEmpty()){
            ClassEntity classEntity = ClassEntity.builder()
                    .academicYear(academicYearRepository.getReferenceById(classCreationRequest.getAcademicYearId()))
                    .className(classCreationRequest.getName())
                    .displayOrder(classCreationRequest.getDisplayOrder())
                    .active(false)
                    .build();

            classesRepo.save(classEntity);

            return;
        }

        throw new ResourceNotFoundException("Class already exists");
    }

    public void createSection(SectionCreationRequest sectionCreationRequest , Long id) {
        List<Section> sections = sectionRepo.findByNameAndClassEntity_Id(sectionCreationRequest.getName(),id);

        if (sections.isEmpty()){
            Section section = Section.builder()
                    .name(sectionCreationRequest.getName())
                    .capacity(sectionCreationRequest.getCapacity())
                    .roomNumber(sectionCreationRequest.getRoomNumber())
                    .classEntity(classesRepo.findById(id).orElseThrow())
                    .build();
            sectionRepo.save(section);
            return;
        }

        throw new ResourceNotFoundException("Section Already Exist");
    }


    public void assignTeacher(Long sectionId, long teacherId) {
        Section section = sectionRepo.findById(sectionId).
                orElseThrow(() -> new ResourceNotFoundException("Section not found"));

        Teacher teacher = teacherRepo.findById(teacherId)
                .orElseThrow(() -> new ResourceNotFoundException("Teacher not found"));

        section.setClassTeacher(teacher);
        sectionRepo.save(section);
    }

    public List<ClassResponse> getClassesByAcademicId(Long academicYearId) {
        List<ClassEntity> classes = classesRepo.findByAcademicYear_Id(academicYearId);

        return classes.stream()
                .map(this::mapToResponse)
                .toList();


    }

    private ClassResponse mapToResponse(ClassEntity classEntity){
        try {

            return ClassResponse.builder()
                    .id(classEntity.getId())
                    .name(classEntity.getClassName())
                    .displayOrder(classEntity.getDisplayOrder())
                    .isActive(classEntity.getActive())
                    .sections(classEntity.getSections().stream().map(
                                            s -> {
                                                return SectionResponse.builder()
                                                        .id(s.getId())
                                                        .name(s.getName())
                                                        .studentCount(s.getStudentCount())
                                                        .capacity(s.getCapacity())
                                                        .roomNumber(s.getRoomNumber())
                                                        .classTeacher(
                                                                Optional.ofNullable(s.getClassTeacher())
                                                                        .map(t -> ClassTeacherResponse.builder()
                                                                                .id(t.getId())
                                                                                .name(t.getFirstName() + " " + t.getLastName())
                                                                                .subject(t.getSubjects().toString())
                                                                                .build()
                                                                        )
                                                                        .orElse(null)
                                                        )
                                                        .build();
                                            }

                                    )
                                    .toList()
                    )
                    .build();
        } catch (Exception e){
            e.printStackTrace();
            return new ClassResponse();
        }

    }
    public void deleteClass(Long classId) {
        try {
            classesRepo.deleteById(classId);
        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
    }
    public void copyStructure(Long yearID) {
        AcademicYear targetYear = academicYearRepository
                .findById(yearID)
                .orElseThrow(()->
                    new ResourceNotFoundException("Not found the target Year data")
                );

        AcademicYear sourceYear =
                academicYearRepository
                        .findPreviousYears(targetYear.getStartDate())
                        .stream()
                        .findFirst()
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Previous academic year not found")
                        );


        List<ClassEntity> sourceClasses = classesRepo.findByAcademicYear_Id(sourceYear.getId());

        List<ClassEntity> newClasses = sourceClasses.stream()
                .map(sourceClass -> ClassEntity.builder()
                        .className(sourceClass.getClassName())
                        .displayOrder(sourceClass.getDisplayOrder())
                        .active(sourceClass.getActive())
                        .academicYear(targetYear)
                        .build()
                )
                .toList();

        List<ClassEntity> savedClasses =
                classesRepo.saveAll(newClasses);

        List<Section> newSections = new ArrayList<>();

        for (int i = 0; i < sourceClasses.size(); i++) {

            ClassEntity sourceClass = sourceClasses.get(i);
            ClassEntity newClass = savedClasses.get(i);

            List<Section> sections = sourceClass.getSections()
                    .stream()
                    .map(sourceSection -> Section.builder()
                            .name(sourceSection.getName())
                            .roomNumber(sourceSection.getRoomNumber())
                            .capacity(sourceSection.getCapacity())
                            .studentCount(0)
                            .classEntity(newClass)
                            .build()
                    )
                    .toList();

            newSections.addAll(sections);
        }

        sectionRepo.saveAll(newSections);
    }
    public void deleteSection(Long sectionId) {
        try {
            sectionRepo.deleteById(sectionId);
        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage());
        }

    }
    private AcademicYearResponse mapToResponse(
            AcademicYear academicYear
    ) {

        return AcademicYearResponse.builder()
                .id(academicYear.getId())
                .name(academicYear.getName())
                .startDate(academicYear.getStartDate())
                .endDate(academicYear.getEndDate())
                .current(academicYear.getCurrent())
                .active(academicYear.getActive())
                .build();
    }
    private TeacherResponse mapToResponse(
            Teacher teacher
    ){
        return TeacherResponse.builder()
                .id(teacher.getId())
                .name(teacher.getFirstName()+" "+teacher.getLastName())
                .subject(teacher.getSubjects().stream()
                        .map(Subject::getSubjectName)
                        .toList()
                        .toString()
                )
                .build();

    }

    public void switchToCurrentSession(Long yearId) {

        AcademicYear newCurrentYear = academicYearRepository.findById(yearId).orElseThrow(() -> new RuntimeException("New current not found"));


        academicYearRepository
                .findByCurrent(true)
                .ifPresent(currentYear -> {
                    currentYear.setCurrent(false);
                    academicYearRepository.save(currentYear);
                });
        newCurrentYear.setCurrent(true);
        academicYearRepository.save(
                newCurrentYear
        );
    }
}

