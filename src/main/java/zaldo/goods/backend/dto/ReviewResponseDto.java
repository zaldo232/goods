package zaldo.goods.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import zaldo.goods.backend.entity.Review;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ReviewResponseDto {
    private Long reviewId;
    private String username;
    private int rating;
    private String content;
    private LocalDateTime createdAt;

    public static ReviewResponseDto fromEntity(Review review) {
        return ReviewResponseDto.builder()
                .reviewId(review.getReviewId()) // <-- 꼭 추가
                .username(review.getUser().getUsername())
                .rating(review.getRating())
                .content(review.getContent())
                .createdAt(review.getCreatedAt())
                .build();
    }
}

