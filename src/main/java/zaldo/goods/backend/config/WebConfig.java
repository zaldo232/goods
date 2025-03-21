package zaldo.goods.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 모든 URL 패턴 허용
                .allowedOrigins("http://localhost:3000")  // React 개발 서버
                .allowedMethods("*")  // GET, POST, PUT, DELETE 등 모든 메서드 허용
                .allowedHeaders("*")  // 모든 헤더 허용
                .allowCredentials(true);  // 인증정보 포함 허용
    }
}
