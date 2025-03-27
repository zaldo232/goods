package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.service.KakaoAuthService;
import zaldo.goods.backend.service.NaverAuthService;

import java.util.Map;

@RestController
@RequestMapping("/api/oauth")
@RequiredArgsConstructor
public class OauthController {

    private final KakaoAuthService kakaoAuthService;
    private final NaverAuthService naverAuthService;

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

    @PostMapping("/naver/code")
    public ResponseEntity<String> naverLogin(@RequestBody Map<String, String> body) {
        String code = body.get("code");
        String state = body.get("state");
        String token = naverAuthService.loginWithNaverCode(code, state);
        return ResponseEntity.ok(token);
    }


}
