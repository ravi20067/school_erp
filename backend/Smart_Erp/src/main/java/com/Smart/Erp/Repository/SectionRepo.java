package com.Smart.Erp.Repository;

import com.Smart.Erp.Entity.ClassEntity;
import com.Smart.Erp.Entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SectionRepo extends JpaRepository<Section,Long> {
    Optional<Section> findByNameAndClassEntity(
            String sectionName,
            ClassEntity classEntity
    );
    List<Section> findByClassEntity(ClassEntity classEntity);
    List<Section> findByNameAndClassEntity_Id(String sectionName, Long id);
}
