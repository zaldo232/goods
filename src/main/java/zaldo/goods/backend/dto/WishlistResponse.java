package zaldo.goods.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class WishlistResponse {
    private Long productId;
    private String productName;
    private String description;
    private BigDecimal price;
}
