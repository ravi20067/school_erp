package com.School.Management.Security;
import com.School.Management.Entity.User;
import com.School.Management.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepo userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        String password = user.get().getPassword();

        if (password == null) {
            password = "{noop}oauth2user";
        }

        if(user.isPresent()){
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.get().getUsername())
                    .password(password)
                    .roles(String.valueOf(user.get().getRoleUser()))
                    .build();
        }
        throw new UsernameNotFoundException("User not found username : "+ username);
    }
}
