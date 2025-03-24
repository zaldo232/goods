package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zaldo.goods.backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
