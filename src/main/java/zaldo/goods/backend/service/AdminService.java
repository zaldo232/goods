package zaldo.goods.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import zaldo.goods.backend.config.JwtUtil;
import zaldo.goods.backend.dto.AdminSignupRequest;
import zaldo.goods.backend.entity.Admin;
import zaldo.goods.backend.repository.AdminRepository;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;  // ✅ 추가!

    public void signup(AdminSignupRequest request) {
        // 중복 체크 (username, email)
        if (adminRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("이미 사용 중인 관리자 ID입니다.");
        }
        if (adminRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 등록된 이메일입니다.");
        }

        // 암호화 후 저장
        Admin admin = new Admin();
        admin.setUsername(request.getUsername());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setEmail(request.getEmail());

        adminRepository.save(admin);
    }

    public String login(String username, String password) {
        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 관리자입니다."));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // ✅ JWT 토큰 발급
        return jwtUtil.generateToken(admin.getUsername());
    }

}
