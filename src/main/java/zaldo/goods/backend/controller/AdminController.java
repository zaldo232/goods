package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.dto.AdminLoginRequest;
import zaldo.goods.backend.dto.AdminSignupRequest;
import zaldo.goods.backend.dto.OrderResponseDto;
import zaldo.goods.backend.dto.ProductUpdateRequest;
import zaldo.goods.backend.entity.Order;
import zaldo.goods.backend.entity.Product;
import zaldo.goods.backend.service.AdminService;
import zaldo.goods.backend.service.OrderService;
import zaldo.goods.backend.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final ProductService productService;
    private final OrderService orderService;

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

    // 📁 AdminController.java (하단에 추가)
    @PutMapping("/products/{id}")
    public ResponseEntity<String> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductUpdateRequest request
    ) {
        productService.updateProduct(id, request);
        return ResponseEntity.ok("상품 수정 완료!");
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("상품 삭제 완료!");
    }

    @PutMapping(value = "/products/{id}", consumes = "multipart/form-data")
    public ResponseEntity<String> updateProductWithImages(
            @PathVariable Long id,
            @RequestPart("product") String productJson,
            @RequestPart(value = "images", required = false) List<MultipartFile> newImages
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ProductUpdateRequest productDto = objectMapper.readValue(productJson, ProductUpdateRequest.class);

            productService.updateProductWithImages(id, productDto, newImages);
            return ResponseEntity.ok("이미지를 포함한 상품 수정 완료!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("상품 수정 실패");
        }
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();

        List<OrderResponseDto> dtos = orders.stream()
                .map(OrderResponseDto::fromEntity)
                .toList();

        return ResponseEntity.ok(dtos);
    }

}
