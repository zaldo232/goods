package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zaldo.goods.backend.entity.Cart;
import zaldo.goods.backend.entity.Product;
import zaldo.goods.backend.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    // 사용자의 특정 상품 장바구니 항목 조회
    Optional<Cart> findByUserAndProduct(User user, Product product);

    // (추후 사용 가능) 사용자의 전체 장바구니 목록
    List<Cart> findByUser(User user);
}
