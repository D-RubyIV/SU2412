package com.example.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Chỉ định đường dẫn của endpoint bạn muốn cho phép CORS
                .allowedOrigins("http://localhost:5173")  // Thay thế bằng URL frontend của bạn
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Các phương thức HTTP được cho phép
                .allowCredentials(true);  // Cho phép các thông tin đăng nhập như cookie (nếu có)
    }
}