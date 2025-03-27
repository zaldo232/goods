package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.dto.FaqRequestDto;
import zaldo.goods.backend.dto.FaqResponseDto;
import zaldo.goods.backend.service.FaqService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/faqs")
@RequiredArgsConstructor
public class AdminFaqController {

    private final FaqService faqService;

    // 전체 목록 (관리자 뷰)
    @GetMapping
    public ResponseEntity<List<FaqResponseDto>> getAllFaqs() {
        return ResponseEntity.ok(faqService.getAllFaqs());
    }

    // 등록
    @PostMapping
    public ResponseEntity<Void> createFaq(@RequestBody FaqRequestDto dto) {
        faqService.createFaq(dto);
        return ResponseEntity.ok().build();
    }

    // 상세
    @GetMapping("/{id}")
    public ResponseEntity<FaqResponseDto> getFaq(@PathVariable Long id) {
        return ResponseEntity.ok(faqService.getFaq(id));
    }

    // 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateFaq(@PathVariable Long id,
                                          @RequestBody FaqRequestDto dto) {
        faqService.updateFaq(id, dto);
        return ResponseEntity.ok().build();
    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable Long id) {
        faqService.deleteFaq(id);
        return ResponseEntity.ok().build();
    }
}
