package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zaldo.goods.backend.entity.Order;
import zaldo.goods.backend.entity.User;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // 나중에 필요하면 사용자별 주문 내역 조회 같은 메서드 추가 가능
    List<Order> findByUser(User user);

}
