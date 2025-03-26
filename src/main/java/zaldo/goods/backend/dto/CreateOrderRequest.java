package zaldo.goods.backend.dto;

import lombok.Getter;
import lombok.Setter;
import zaldo.goods.backend.enums.PaymentMethod;

import java.util.List;

@Getter
@Setter
public class CreateOrderRequest {
    private List<Long> productIds; // 상품 ID 목록
    private List<Integer> quantities; // 각 상품 수량

    private PaymentMethod paymentMethod; // CARD, BANK_TRANSFER, KAKAO_PAY 등
}
