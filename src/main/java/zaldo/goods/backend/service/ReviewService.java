package zaldo.goods.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zaldo.goods.backend.dto.ReviewRequestDto;
import zaldo.goods.backend.dto.ReviewResponseDto;
import zaldo.goods.backend.entity.*;
import zaldo.goods.backend.repository.*;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    @Transactional
    public void createReview(User user, ReviewRequestDto request) {
        Long productId = request.getProductId();

        // 1. 해당 상품을 구매한 적 있는지 확인
        boolean hasPurchased = orderItemRepository
                .findByOrder_User(user).stream()
                .anyMatch(item -> item.getProduct().getProductId().equals(productId));

        if (!hasPurchased) {
            throw new IllegalArgumentException("해당 상품을 구매한 적이 없습니다.");
        }

        // 2. 이미 리뷰를 작성한 경우 막기
        Optional<Review> existing = reviewRepository.findByUser_UserIdAndProduct_ProductId(user.getUserId(), productId);
        if (existing.isPresent()) {
            throw new IllegalArgumentException("이미 리뷰를 작성하셨습니다.");
        }

        // 3. 리뷰 저장
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(request.getRating())
                .content(request.getContent())
                .build();

        reviewRepository.save(review);
    }

    @Transactional
    public List<ReviewResponseDto> getReviewsByProductId(Long productId) {
        List<Review> reviews = reviewRepository.findByProduct_ProductId(productId);

        return reviews.stream()
                .map(ReviewResponseDto::fromEntity)
                .toList();
    }


}
