package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.config.JwtUtil;
import zaldo.goods.backend.dto.CreateOrderRequest;
import zaldo.goods.backend.dto.OrderResponseDto;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.repository.UserRepository;
import zaldo.goods.backend.service.OrderService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestHeader("Authorization") String token,
                                         @RequestBody CreateOrderRequest request) {
        String jwt = token.substring(7); // "Bearer " 제거
        String username = jwtUtil.extractUsername(jwt);

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        try {
            orderService.createOrder(userOptional.get(), request);
            return ResponseEntity.ok("주문이 성공적으로 완료되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getOrders(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        String username = jwtUtil.extractUsername(jwt);

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
        }

        List<OrderResponseDto> orders = orderService.getOrders(userOptional.get());
        return ResponseEntity.ok(orders);
    }

}
