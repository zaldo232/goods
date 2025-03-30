package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zaldo.goods.backend.entity.Product;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 추천 상품 리스트
    List<Product> findByIsRecommendedTrue();

    // 베스트 셀러 (최근 30일 내 판매량 기준)
    @Query(value = """
    SELECT p.* FROM products p
    JOIN order_items oi ON p.product_id = oi.product_id
    JOIN orders o ON oi.order_id = o.order_id
    WHERE o.created_at >= NOW() - INTERVAL 30 DAY
    GROUP BY p.product_id
    ORDER BY SUM(oi.quantity) DESC
    LIMIT 10
    """, nativeQuery = true)

    List<Product> findTopBestSellers();


}
