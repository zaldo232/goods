package zaldo.goods.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import zaldo.goods.backend.enums.SocialType;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")  // 테이블명 지정
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;  // PK

    @Column(nullable = false, unique = true, length = 50)
    private String username;  // 사용자 아이디

    @Column(nullable = false)
    private String password;  // 비밀번호 (해싱 저장)

    @Column(nullable = false, unique = true, length = 100)
    private String email;  // 이메일

    @Column(length = 20)
    private String phoneNumber;  // 전화번호

    @Enumerated(EnumType.STRING)
    private SocialType socialType = SocialType.NONE;  // 소셜 로그인 여부

    private LocalDateTime createdAt = LocalDateTime.now();

    public void encodePassword(BCryptPasswordEncoder encoder) {
        this.password = encoder.encode(this.password);
    }
}
