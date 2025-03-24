package zaldo.goods.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductCreateRequest {
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
    private Long categoryId;
}
