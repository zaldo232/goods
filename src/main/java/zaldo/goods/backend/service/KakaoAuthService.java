package zaldo.goods.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import zaldo.goods.backend.config.JwtUtil;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.enums.SocialType;
import zaldo.goods.backend.repository.UserRepository;

import org.springframework.http.HttpHeaders;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestTemplate restTemplate = new RestTemplate();

    public String kakaoLogin(String accessToken) {
        // 사용자 정보 요청
        String kakaoUserInfoUrl = "https://kapi.kakao.com/v2/user/me";
        var headers = new org.springframework.http.HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        var entity = new org.springframework.http.HttpEntity<>(headers);
        var response = restTemplate.exchange(kakaoUserInfoUrl, org.springframework.http.HttpMethod.GET, entity, String.class);
        try {
            JsonNode json = objectMapper.readTree(response.getBody());

            String kakaoId = json.get("id").asText(); // 카카오 고유 ID
            String email = json.path("kakao_account").path("email").asText(null); // optional
            String nickname = json.path("properties").path("nickname").asText("카카오유저");

            // 사용자 찾기 or 생성
            Optional<User> existingUser = userRepository.findByUsername(kakaoId);
            User user = existingUser.orElseGet(() -> {
                User newUser = new User();
                newUser.setUsername(kakaoId); // username에 고유ID 저장
                newUser.setPassword("SOCIAL_LOGIN"); // 패스워드 의미 없음
                newUser.setEmail(email != null ? email : kakaoId + "@kakao.com");
                newUser.setSocialType(SocialType.KAKAO);
                return userRepository.save(newUser);
            });

            return jwtUtil.generateToken(user.getUsername()); // JWT 발급

        } catch (Exception e) {
            throw new RuntimeException("카카오 로그인 실패", e);
        }
    }

    public String loginWithKakaoCode(String code) {
        String redirectUri = "http://localhost:3000/oauth/kakao"; // 카카오 설정에 등록된 redirect uri
        String tokenUrl = "https://kauth.kakao.com/oauth/token";

        // 카카오 토큰 요청
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "b16fb69044401237ee461982ea021282");
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, request, String.class);

        try {
            JsonNode tokenJson = objectMapper.readTree(response.getBody());
            String accessToken = tokenJson.get("access_token").asText();

            // 기존 로그인 로직 재사용
            return kakaoLogin(accessToken);

        } catch (Exception e) {
            throw new RuntimeException("카카오 code → token 교환 실패", e);
        }
    }

}
