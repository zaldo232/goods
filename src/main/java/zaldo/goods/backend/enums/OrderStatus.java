package zaldo.goods.backend.enums;

public enum OrderStatus {
    PENDING,       // 결제 대기
    CONFIRMED,     // 결제 완료
    CANCELLED,     // 주문 취소
    SHIPPED,       // 배송 중
    DELIVERED      // 배송 완료
}
