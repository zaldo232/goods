package zaldo.goods.backend.dto;

import lombok.Builder;
import lombok.Getter;
import zaldo.goods.backend.entity.Review;

import java.time.LocalDateTime;

@Getter
@Builder
public class ReviewResponseDto {
    private String username;
    private int rating;
    private String content;
    private LocalDateTime createdAt;

    public static ReviewResponseDto fromEntity(Review review) {
        return ReviewResponseDto.builder()
                .username(review.getUser().getUsername())
                .rating(review.getRating())
                .content(review.getContent())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
