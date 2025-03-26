package zaldo.goods.backend.dto;

import lombok.Getter;
import lombok.Setter;
import zaldo.goods.backend.enums.InquiryStatus;

import java.time.LocalDateTime;

@Getter
@Setter
public class InquiryResponseDto {
    private Long inquiryId;
    private String title;
    private String content;
    private String response;
    private InquiryStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
