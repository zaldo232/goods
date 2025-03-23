package zaldo.goods.backend.dto;

import lombok.Builder;
import lombok.Getter;
import zaldo.goods.backend.entity.Cart;

@Getter
@Builder
public class CartResponseDto {
    private Long productId;
    private String productName;
    private String description;
    private int quantity;
    private double unitPrice;
    private double totalPrice;

    public static CartResponseDto fromEntity(Cart cart) {
        return CartResponseDto.builder()
                .productId(cart.getProduct().getProductId())
                .productName(cart.getProduct().getName())
                .description(cart.getProduct().getDescription())
                .quantity(cart.getQuantity())
                .unitPrice(cart.getProduct().getPrice().doubleValue())
                .totalPrice(cart.getProduct().getPrice().doubleValue() * cart.getQuantity())
                .build();
    }
}
