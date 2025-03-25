package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.dto.AdminLoginRequest;
import zaldo.goods.backend.dto.AdminSignupRequest;
import zaldo.goods.backend.entity.Product;
import zaldo.goods.backend.service.AdminService;
import zaldo.goods.backend.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final ProductService productService;

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

    // 🔍 관리자 상품 목록 조회
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProductsForAdmin() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

}
