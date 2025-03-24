package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zaldo.goods.backend.entity.Wishlist;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserUserId(Long userId);
    Optional<Wishlist> findByUserUserIdAndProductProductId(Long userId, Long productId);
    void deleteByUserUserIdAndProductProductId(Long userId, Long productId);
}
