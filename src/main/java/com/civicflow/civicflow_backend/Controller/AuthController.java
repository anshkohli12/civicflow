package com.civicflow.civicflow_backend.Controller;

import com.civicflow.civicflow_backend.config.JwtUtil;
import com.civicflow.civicflow_backend.dto.AuthResponse;
import com.civicflow.civicflow_backend.dto.LoginRequest;
import com.civicflow.civicflow_backend.dto.RegisterRequest;
import com.civicflow.civicflow_backend.model.Role;
import com.civicflow.civicflow_backend.model.User;
import com.civicflow.civicflow_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }
        
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAreaCode(request.getAreaCode());
        user.setRole(Role.USER); // default role

        userRepository.save(user);

        // Generate JWT after registration
        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername(), user.getEmail(), 
                               user.getFirstName(), user.getLastName(), user.getRole().toString());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token, user.getUsername(), user.getEmail(), 
                               user.getFirstName(), user.getLastName(), user.getRole().toString());
    }
}
