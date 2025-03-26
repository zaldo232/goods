package zaldo.goods.backend.dto;

import lombok.Builder;
import lombok.Getter;
import zaldo.goods.backend.entity.Order;
import zaldo.goods.backend.entity.OrderItem;
import zaldo.goods.backend.entity.Product;
import zaldo.goods.backend.enums.OrderStatus;
import zaldo.goods.backend.enums.PaymentMethod;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class OrderDetailDto {
    private Long orderId;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private LocalDateTime createdAt;
    private List<OrderItemDto> items;

    @Getter
    @Builder
    public static class OrderItemDto {
        private Long productId;
        private String productName;
        private int quantity;
        private BigDecimal price;
    }

    public static OrderDetailDto fromEntity(Order order) {
        return OrderDetailDto.builder()
                .orderId(order.getOrderId())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .createdAt(order.getCreatedAt())
                .items(order.getOrderItems().stream().map(item -> {
                    Product product = item.getProduct();
                    return OrderItemDto.builder()
                            .productId(product.getProductId())
                            .productName(product.getName())
                            .quantity(item.getQuantity())
                            .price(item.getPrice())
                            .build();
                }).collect(Collectors.toList()))
                .build();
    }
}
