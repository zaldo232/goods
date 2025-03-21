package zaldo.goods.backend.controller;  // 패키지 경로 수정

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test")
    public String testConnection() {
        return "백엔드 연결 성공!";
    }
}
