package zaldo.goods.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import zaldo.goods.backend.dto.ProductCreateRequest;
import zaldo.goods.backend.entity.Product;
import zaldo.goods.backend.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // 🔍 상품 전체 조회 API
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .<ResponseEntity<Object>>map(product -> ResponseEntity.ok(product))
                .orElse(ResponseEntity.status(404).body("상품을 찾을 수 없습니다."));
    }

    @PostMapping(value = "/add", consumes = {"multipart/form-data"})
    public ResponseEntity<?> addProduct(
            @RequestPart("product") String productJson,
            @RequestPart("images") List<MultipartFile> images
    ) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ProductCreateRequest productDto = objectMapper.readValue(productJson, ProductCreateRequest.class);

            productService.createProductWithImages(productDto, images);
            return ResponseEntity.ok("상품이 등록되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("상품 등록 실패");
        }
    }


}
