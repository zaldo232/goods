package zaldo.goods.backend.dto;

import lombok.Getter;
import lombok.Setter;
import zaldo.goods.backend.enums.PaymentMethod;

@Getter
@Setter
public class CreateOrderRequest {
    private PaymentMethod paymentMethod; // CARD, BANK_TRANSFER, KAKAO_PAY 등
}
