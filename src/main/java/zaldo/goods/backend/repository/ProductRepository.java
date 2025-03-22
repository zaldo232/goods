package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zaldo.goods.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
