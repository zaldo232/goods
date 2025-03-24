package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zaldo.goods.backend.entity.Review;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findByUser_UserIdAndProduct_ProductId(Long userId, Long productId);
    List<Review> findByProduct_ProductId(Long productId);
}
