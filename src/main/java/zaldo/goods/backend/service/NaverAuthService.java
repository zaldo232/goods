package zaldo.goods.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import zaldo.goods.backend.config.JwtUtil;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.enums.SocialType;
import zaldo.goods.backend.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NaverAuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String loginWithNaverCode(String code, String state) {
        String redirectUri = "http://localhost:3000/oauth/naver";
        String tokenUrl = "https://nid.naver.com/oauth2.0/token";

        // 1. Access Token 요청
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "D97ivFB_S4nieo77_laQ");
        params.add("client_secret", "E1MI1qGxZ_");
        params.add("code", code);
        params.add("state", state);
        params.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, request, String.class);

        try {
            JsonNode tokenJson = objectMapper.readTree(response.getBody());
            String accessToken = tokenJson.get("access_token").asText();

            return loginWithAccessToken(accessToken);
        } catch (Exception e) {
            throw new RuntimeException("네이버 로그인 실패", e);
        }
    }

    public String loginWithAccessToken(String accessToken) {
        // 2. 사용자 정보 요청
        String profileUrl = "https://openapi.naver.com/v1/nid/me";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<?> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(profileUrl, HttpMethod.GET, request, String.class);

        try {
            JsonNode json = objectMapper.readTree(response.getBody());
            JsonNode res = json.path("response");

            String naverId = res.get("id").asText();
            String email = res.path("email").asText(naverId + "@naver.com");

            Optional<User> existingUser = userRepository.findByUsername(naverId);
            User user = existingUser.orElseGet(() -> {
                User newUser = new User();
                newUser.setUsername(naverId);
                newUser.setPassword("SOCIAL_LOGIN");
                newUser.setEmail(email);
                newUser.setSocialType(SocialType.NAVER);
                return userRepository.save(newUser);
            });

            return jwtUtil.generateToken(user.getUsername());
        } catch (Exception e) {
            throw new RuntimeException("네이버 사용자 정보 조회 실패", e);
        }
    }
}
