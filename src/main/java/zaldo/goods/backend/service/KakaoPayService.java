package zaldo.goods.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class KakaoPayService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestTemplate restTemplate = new RestTemplate();

    // 🔑 테스트용 Admin Key
    private static final String ADMIN_KEY = "KakaoAK 0e21f1ae63954ace24e759251dd85e39";
    private static final String CID = "TC0ONETIME"; // 테스트 전용 CID

    public String requestPay() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", ADMIN_KEY);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("cid", CID);
        body.add("partner_order_id", "ORDER1234");
        body.add("partner_user_id", "USER5678");
        body.add("item_name", "테스트 상품");
        body.add("quantity", "1");
        body.add("total_amount", "1000");
        body.add("tax_free_amount", "0");

        // 리다이렉션 경로 (프론트 페이지 연결)
        body.add("approval_url", "http://localhost:3000/payment/success");
        body.add("cancel_url", "http://localhost:3000/payment/cancel");
        body.add("fail_url", "http://localhost:3000/payment/fail");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    "https://kapi.kakao.com/v1/payment/ready",
                    request,
                    String.class
            );

            JsonNode json = objectMapper.readTree(response.getBody());
            return json.get("next_redirect_pc_url").asText(); // ✅ 프론트에서 이동할 URL

        } catch (Exception e) {
            throw new RuntimeException("카카오페이 요청 실패", e);
        }
    }
}
