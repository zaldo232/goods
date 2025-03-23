package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.config.JwtUtil;
import zaldo.goods.backend.dto.AddToCartRequest;
import zaldo.goods.backend.dto.CartResponseDto;
import zaldo.goods.backend.entity.Cart;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.repository.UserRepository;
import zaldo.goods.backend.service.CartService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestHeader("Authorization") String token,
                                       @RequestBody AddToCartRequest request) {
        // 토큰 파싱
        String jwt = token.substring(7); // "Bearer " 제거
        String username = jwtUtil.extractUsername(jwt);

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        cartService.addToCart(userOptional.get(), request);
        return ResponseEntity.ok("장바구니에 상품이 추가되었습니다.");
    }

    @GetMapping
    public ResponseEntity<?> getCartItems(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        List<CartResponseDto> cartItems = cartService.getCartItems(userOptional.get());
        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromCart(@RequestHeader("Authorization") String token,
                                            @PathVariable Long productId) {
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        try {
            cartService.removeFromCart(userOptional.get(), productId);
            return ResponseEntity.ok("장바구니에서 상품이 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
