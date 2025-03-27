package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zaldo.goods.backend.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long> {
}
