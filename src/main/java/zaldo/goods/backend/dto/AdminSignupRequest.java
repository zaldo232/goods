package zaldo.goods.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminSignupRequest {
    private String username;
    private String password;
    private String email;
}
