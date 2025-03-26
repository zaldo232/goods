package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.dto.InquiryAnswerRequestDto;
import zaldo.goods.backend.dto.InquiryResponseDto;
import zaldo.goods.backend.service.InquiryService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/inquiries")
@RequiredArgsConstructor
public class AdminInquiryController {

    private final InquiryService inquiryService;

    // 전체 문의 목록 조회
    @GetMapping
    public ResponseEntity<List<InquiryResponseDto>> getAllInquiries() {
        List<InquiryResponseDto> inquiries = inquiryService.getAllInquiries();
        return ResponseEntity.ok(inquiries);
    }

    // 문의 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<InquiryResponseDto> getInquiryDetail(@PathVariable Long id) {
        InquiryResponseDto dto = inquiryService.getInquiryDetail(id);
        return ResponseEntity.ok(dto);
    }

    // 문의에 답변 등록
    @PutMapping("/{id}/response")
    public ResponseEntity<Void> answerInquiry(@PathVariable Long id,
                                              @RequestBody InquiryAnswerRequestDto dto) {
        inquiryService.answerInquiry(id, dto);
        return ResponseEntity.ok().build();
    }
}
