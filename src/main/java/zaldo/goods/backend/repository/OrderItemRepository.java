package zaldo.goods.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zaldo.goods.backend.entity.OrderItem;
import zaldo.goods.backend.entity.User;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder_OrderId(Long orderId);
    List<OrderItem> findByOrder_User(User user);

}
