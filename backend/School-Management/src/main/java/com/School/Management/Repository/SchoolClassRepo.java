package com.School.Management.Repository;

import com.School.Management.Entity.SchoolClass;
import com.School.Management.Enum.Classes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SchoolClassRepo extends JpaRepository<SchoolClass,Long> {
    Optional<SchoolClass> findByClassName(Classes classes);
}
