package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.config.JwtUtil;
import zaldo.goods.backend.dto.AddToWishlistRequest;
import zaldo.goods.backend.service.WishlistService;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    // 찜 추가
    @PostMapping("/add")
    public ResponseEntity<?> addToWishlist(@RequestHeader("Authorization") String token,
                                           @RequestBody AddToWishlistRequest request) {
        String username = jwtUtil.extractUsername(token.substring(7));
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");

        try {
            wishlistService.addToWishlist(user.get(), request);
            return ResponseEntity.ok("찜한 상품에 추가되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 찜 삭제
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromWishlist(@RequestHeader("Authorization") String token,
                                                @PathVariable Long productId) {
        String username = jwtUtil.extractUsername(token.substring(7));
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");

        wishlistService.removeFromWishlist(user.get(), productId);
        return ResponseEntity.ok("찜한 상품에서 제거되었습니다.");
    }

    // 찜 목록 조회
    @GetMapping
    public ResponseEntity<?> getWishlist(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.substring(7));
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");

        return ResponseEntity.ok(wishlistService.getWishlist(user.get()));
    }
}
