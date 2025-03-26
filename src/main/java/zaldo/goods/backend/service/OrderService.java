package zaldo.goods.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zaldo.goods.backend.dto.CreateOrderRequest;
import zaldo.goods.backend.dto.OrderItemResponseDto;
import zaldo.goods.backend.dto.OrderResponseDto;
import zaldo.goods.backend.entity.*;
import zaldo.goods.backend.enums.OrderStatus;
import zaldo.goods.backend.repository.*;
import java.math.BigDecimal;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;

    @Transactional
    public void createOrder(User user, CreateOrderRequest request) {
        List<Cart> cartItems = cartRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException("장바구니가 비어있습니다.");
        }

        // 총 가격 계산
        BigDecimal totalPrice = cartItems.stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 주문 생성
        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);
        order.setPaymentMethod(request.getPaymentMethod());
        orderRepository.save(order);

        // 주문 상세 생성
        for (Cart cart : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cart.getProduct());
            orderItem.setQuantity(cart.getQuantity());
            orderItem.setPrice(cart.getProduct().getPrice());
            orderItemRepository.save(orderItem);
        }

        // 장바구니 비우기
        cartRepository.deleteAll(cartItems);
    }

    @Transactional
    public List<OrderResponseDto> getOrders(User user) {
        List<Order> orders = orderRepository.findByUser(user);

        return orders.stream()
                .map(OrderResponseDto::fromEntity)
                .toList();
    }

    @Transactional
    public List<OrderItemResponseDto> getOrderItems(Long orderId) {
        List<OrderItem> orderItems = orderItemRepository.findByOrder_OrderId(orderId);

        return orderItems.stream()
                .map(OrderItemResponseDto::fromEntity)
                .toList();
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll(); // 전체 주문 반환
    }
}
