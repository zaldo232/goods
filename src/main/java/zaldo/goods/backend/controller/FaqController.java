package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.dto.FaqResponseDto;
import zaldo.goods.backend.service.FaqService;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    // 전체 FAQ 목록
    @GetMapping
    public ResponseEntity<List<FaqResponseDto>> getAllFaqs() {
        return ResponseEntity.ok(faqService.getAllFaqs());
    }

    // FAQ 상세
    @GetMapping("/{id}")
    public ResponseEntity<FaqResponseDto> getFaq(@PathVariable Long id) {
        return ResponseEntity.ok(faqService.getFaq(id));
    }
}
