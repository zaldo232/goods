package zaldo.goods.backend.dto;

import lombok.Getter;
import lombok.Setter;
import zaldo.goods.backend.entity.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Getter
@Setter
public class UserDto {
    private String username;
    private String password;
    private String email;
    private String phoneNumber;

    public User toEntity(BCryptPasswordEncoder encoder) {
        return User.builder()
                .username(username)
                .password(encoder.encode(password))
                .email(email)
                .phoneNumber(phoneNumber)
                .build();
    }
}
