package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import zaldo.goods.backend.entity.Inquiry;
import zaldo.goods.backend.entity.User;

import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findByUser(User user); // 사용자별 문의 내역
}
