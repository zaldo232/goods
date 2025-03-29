package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.service.KakaoPayService;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    @GetMapping("/kakao")
    public String requestPay() {
        return kakaoPayService.requestPay(); // ✅ URL 리턴
    }
}
