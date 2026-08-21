package com.Smart.Erp.Repository;

import com.Smart.Erp.Entity.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface ClassRepo extends JpaRepository<ClassEntity,Long> {
    List<ClassEntity> findByAcademicYear_Current(Boolean current);
    Optional<ClassEntity> findByClassNameAndAcademicYear_Current(String className,Boolean current);
    List<ClassEntity> findByClassNameAndAcademicYear_Id(String className,Long id);
    List<ClassEntity> findByAcademicYear_Id(Long id);
}
