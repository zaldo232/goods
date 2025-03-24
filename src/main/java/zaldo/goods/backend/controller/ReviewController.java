package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.config.JwtUtil;
import zaldo.goods.backend.dto.ReviewRequestDto;
import zaldo.goods.backend.dto.ReviewResponseDto;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.repository.UserRepository;
import zaldo.goods.backend.service.ReviewService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> writeReview(@RequestHeader("Authorization") String token,
                                         @RequestBody ReviewRequestDto request) {
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        try {
            reviewService.createReview(userOptional.get(), request);
            return ResponseEntity.ok("리뷰가 작성되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getReviewsByProduct(@PathVariable Long productId) {
        List<ReviewResponseDto> reviews = reviewService.getReviewsByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(@RequestHeader("Authorization") String token,
                                          @PathVariable Long reviewId) {
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        try {
            reviewService.deleteReview(userOptional.get(), reviewId);
            return ResponseEntity.ok("리뷰가 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(@RequestHeader("Authorization") String token,
                                          @PathVariable Long reviewId,
                                          @RequestBody ReviewRequestDto request) {
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        try {
            reviewService.updateReview(userOptional.get(), reviewId, request);
            return ResponseEntity.ok("리뷰가 수정되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }

}
