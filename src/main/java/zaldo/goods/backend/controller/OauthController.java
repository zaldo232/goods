package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.service.KakaoAuthService;

import java.util.Map;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OauthController {

    private final KakaoAuthService kakaoAuthService;

    @PostMapping("/kakao")
    public ResponseEntity<Map<String, String>> kakaoLogin(@RequestBody Map<String, String> body) {
        String accessToken = body.get("accessToken");
        String jwt = kakaoAuthService.kakaoLogin(accessToken);
        return ResponseEntity.ok(Map.of("token", jwt));
    }

    @PostMapping("/kakao/code")
    public ResponseEntity<Map<String, String>> kakaoLoginByCode(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        String jwt = kakaoAuthService.loginWithKakaoCode(code);
        return ResponseEntity.ok(Map.of("token", jwt));
    }

}
