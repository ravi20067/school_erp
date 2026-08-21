package com.Smart.Erp.Config;

import com.Smart.Erp.Entity.User;
import com.Smart.Erp.Enum.Role;
import com.Smart.Erp.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepo userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.count() == 0) {

            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRoleUser(Role.ADMIN);

            userRepository.save(admin);
        }
    }
}
