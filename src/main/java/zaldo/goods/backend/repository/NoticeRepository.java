package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zaldo.goods.backend.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
