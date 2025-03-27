package zaldo.goods.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FaqRequestDto {
    private String question;
    private String answer;
}
