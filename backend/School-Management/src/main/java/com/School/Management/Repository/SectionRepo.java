package com.School.Management.Repository;

import com.School.Management.Entity.SchoolClass;
import com.School.Management.Entity.Section;
import com.School.Management.Enum.Classes;
import com.School.Management.Enum.Sections;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SectionRepo extends JpaRepository<Section,Long> {
    Optional<Section> findBySectionNameAndSchoolClass(
            Sections sectionName,
            SchoolClass schoolClass
    );
    List<Section> findBySchoolClass_ClassName(Classes className);
}
