package com.School.Management.Repository;

import com.School.Management.Entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface SchoolClassRepo extends JpaRepository<ClassEntity,Long> {
    List<ClassEntity> findByAcademicYear_Name(String Name);
    Optional<ClassEntity> findByClassNameAndAcademicYear_Name(String classes,String Name);
}
