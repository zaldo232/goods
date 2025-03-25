package zaldo.goods.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import zaldo.goods.backend.dto.AdminSignupRequest;
import zaldo.goods.backend.entity.Admin;
import zaldo.goods.backend.repository.AdminRepository;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;

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
}
