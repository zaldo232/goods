package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.dto.AdminLoginRequest;
import zaldo.goods.backend.dto.AdminSignupRequest;
import zaldo.goods.backend.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // ✅ 관리자 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> registerAdmin(@RequestBody AdminSignupRequest request) {
        try {
            adminService.signup(request);
            return ResponseEntity.ok("관리자 회원가입이 완료되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AdminLoginRequest request) {
        try {
            String token = adminService.login(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(token); // JWT 토큰 반환
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> adminTest() {
        return ResponseEntity.ok("✅ 관리자 전용 API 접근 성공!");
    }

}
