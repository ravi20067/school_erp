package com.Smart.Erp.Service;

import com.Smart.Erp.DTO.Admin.DeviceDto;
import com.Smart.Erp.DTO.Admin.Student.StudentDTO;
import com.Smart.Erp.DTO.Admin.Teacher.TeacherDto;
import com.Smart.Erp.DTO.UserProfileDto;
import com.Smart.Erp.Entity.*;
import com.Smart.Erp.Enum.Role;
import com.Smart.Erp.Enum.Status;
import com.Smart.Erp.Repository.*;
import jakarta.transaction.Transactional;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
@Transactional
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ClassRepo classRepo;

    @Autowired
    private SectionRepo sectionRepo;

    @Autowired
    private SequenceRepo sequenceRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private DeviceRepo deviceRepo;

    public Teacher addTeacherUser (TeacherDto dto){
        Integer currentYear = LocalDate.now().getYear();

        Sequence sequence = sequenceRepo.findByYear(dto.getRole().name()+currentYear)
                .orElseGet(() -> Sequence.builder()
                        .year(dto.getRole().name()+currentYear)
                        .CurrentValue(0)
                        .build());

        sequence.setCurrentValue(sequence.getCurrentValue() + 1);
        sequence = sequenceRepo.save(sequence);

        String username =dto.getRole().getCode() + currentYear +
                String.format("%04d", sequence.getCurrentValue());

        User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(
                        dto.getDateOfBirth()
                                .format(DateTimeFormatter.ofPattern("ddMMyyyy"))
                ))
                .enabled(true)
                .roleUser(dto.getRole())
                .build();

        user = userRepo.save(user);

        Teacher teacher = Teacher.builder()
                .employeeId(username)
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .qualification(dto.getQualification())
                .specialization(dto.getSpecialization())
                .joiningDate(LocalDate.now())
                .dateOfBirth(dto.getDateOfBirth())
                .status(dto.getStatus())
                .gender(dto.getGender())
                .user(user)
                .build();

        return teacherRepo.save(teacher);
    }

    public Student addstudent(StudentDTO dto) {
        Integer currentYear = LocalDate.now().getYear();

        Sequence sequence = sequenceRepo.findByYear(Role.STUDENT.name()+currentYear)
                .orElseGet(() -> Sequence.builder()
                        .year(Role.STUDENT.name()+currentYear)
                        .CurrentValue(0)
                        .build());

        sequence.setCurrentValue(sequence.getCurrentValue() + 1);
        sequence = sequenceRepo.save(sequence);

        String admissionNo = Role.STUDENT.getCode() + currentYear +
                String.format("%05d", sequence.getCurrentValue());

        ClassEntity classEntity = classRepo
                .findByClassNameAndAcademicYear_Current(dto.getSchoolClass(),true)
                .orElseThrow(() ->
                        new RuntimeException("Class not found"));

        Section section = sectionRepo
                .findByNameAndClassEntity(
                        dto.getSection(),
                        classEntity
                )
                .orElseThrow(() ->
                        new RuntimeException("Section not found"));


        int currentStudentCount =
                section.getStudentCount() == null
                        ? 0
                        : section.getStudentCount();

        if (currentStudentCount >= section.getCapacity()) {
            throw new RuntimeException("Capacity of class is full");
        }

        int newStudentCount = currentStudentCount + 1;

        section.setStudentCount(newStudentCount);
        sectionRepo.save(section);
        User user = User.builder()
                .username(admissionNo)
                .password(passwordEncoder.encode(
                        dto.getDateOfBirth()
                                .format(DateTimeFormatter.ofPattern("ddMMyyyy"))
                ))
                .enabled(true)
                .roleUser(Role.STUDENT)
                .build();

        user = userRepo.save(user);

        Student student = Student.builder()
                .admissionNo(admissionNo)
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .gender(dto.getGender())
                .dateOfBirth(dto.getDateOfBirth())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .rollNumber(section.getStudentCount())
                .status(Status.ACTIVE)
                .admissionDate(LocalDate.now())
                .classEntity(classEntity)
                .section(section)
                .user(user)
                .build();

        user.setStudent(student);

        return studentRepo.save(student);
    }

    public @Nullable UserProfileDto getProfile(String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (
                user.getRoleUser() == Role.STUDENT
        ) {
            return UserProfileDto.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .firstName(user.getStudent().getFirstName())
                    .lastName(user.getStudent().getLastName())
                    .email(user.getStudent().getEmail())
                    .phone(user.getStudent().getPhone())
                    .build();
        } else if (user.getRoleUser() == Role.DEVICES) {
            return UserProfileDto.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .firstName(user.getDevices().getLocation())
                    .build();

        } else {
            return UserProfileDto.builder()
                    .id(0L)
                    .username("admin")
                    .firstName("administrator ")
                    .lastName("team")
                    .email("admin@xyz.com")
                    .phone("1234567890")
                    .build();
        }
    }

    public @Nullable Devices addDevice(DeviceDto deviceDto) {
        Integer currentYear = LocalDate.now().getYear();

        Sequence sequence = sequenceRepo.findByYear(Role.DEVICES.name()+currentYear)
                .orElseGet(() -> Sequence.builder()
                        .year(Role.DEVICES.name()+currentYear)
                        .CurrentValue(0)
                        .build());
        sequence.setCurrentValue(sequence.getCurrentValue() + 1);
        sequence = sequenceRepo.save(sequence);
        String username =Role.DEVICES.getCode() + currentYear +
                String.format("%04d", sequence.getCurrentValue());
        User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(deviceDto.getPassword()))
                .enabled(true)
                .roleUser(Role.DEVICES)
                .build();

        user = userRepo.save(user);

        Devices devices = Devices.builder()
                .user(user)
                .deviceEPid(username)
                .password(deviceDto.getPassword())
                .Location(deviceDto.getLocation())
                .status(Status.ACTIVE)
                .build();

        return deviceRepo.save(devices);
    }

    public User getUser(String username) {
        return userRepo.findByUsername(username).orElseThrow();
    }
}
