package zaldo.goods.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequestDto {
    private Long productId;
    private int rating;         // 1 ~ 5
    private String content;
}
