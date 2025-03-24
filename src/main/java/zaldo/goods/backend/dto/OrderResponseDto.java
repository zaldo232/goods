package zaldo.goods.backend.dto;

import lombok.Builder;
import lombok.Getter;
import zaldo.goods.backend.entity.Order;
import zaldo.goods.backend.enums.OrderStatus;
import zaldo.goods.backend.enums.PaymentMethod;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class OrderResponseDto {
    private Long orderId;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private LocalDateTime createdAt;

    public static OrderResponseDto fromEntity(Order order) {
        return OrderResponseDto.builder()
                .orderId(order.getOrderId())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus())
                .paymentMethod(order.getPaymentMethod())
                .createdAt(order.getCreatedAt())
                .build();
    }


}
