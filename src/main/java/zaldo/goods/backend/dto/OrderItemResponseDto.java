package zaldo.goods.backend.dto;

import lombok.Builder;
import lombok.Getter;
import zaldo.goods.backend.entity.OrderItem;

import java.math.BigDecimal;

@Getter
@Builder
public class OrderItemResponseDto {
    private Long productId;
    private String productName;
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;

    public static OrderItemResponseDto fromEntity(OrderItem item) {
        BigDecimal total = item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));

        return OrderItemResponseDto.builder()
                .productId(item.getProduct().getProductId())
                .productName(item.getProduct().getName())
                .quantity(item.getQuantity())
                .unitPrice(item.getPrice())
                .totalPrice(total)
                .build();
    }
}
