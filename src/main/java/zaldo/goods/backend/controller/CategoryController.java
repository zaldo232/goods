package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.entity.Category;
import zaldo.goods.backend.repository.CategoryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    // 🔹 카테고리 등록
    @PostMapping
    public ResponseEntity<String> addCategory(@RequestBody Category category) {
        categoryRepository.save(category);
        return ResponseEntity.ok("카테고리 등록 완료!");
    }

    // 🔹 카테고리 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok("카테고리 삭제 완료!");
    }
}
