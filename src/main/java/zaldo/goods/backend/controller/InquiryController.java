package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.dto.InquiryRequestDto;
import zaldo.goods.backend.dto.InquiryResponseDto;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.service.InquiryService;
import zaldo.goods.backend.repository.UserRepository;
import zaldo.goods.backend.config.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    // 문의 등록
    @PostMapping
    public ResponseEntity<Void> createInquiry(@RequestHeader("Authorization") String token,
                                              @RequestBody InquiryRequestDto dto) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        inquiryService.createInquiry(dto, user.getUserId());
        return ResponseEntity.ok().build();
    }

    // 내 문의 목록 조회
    @GetMapping
    public ResponseEntity<List<InquiryResponseDto>> getMyInquiries(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        List<InquiryResponseDto> inquiries = inquiryService.getMyInquiries(user.getUserId());
        return ResponseEntity.ok(inquiries);
    }

    // 내 문의 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<InquiryResponseDto> getMyInquiryDetail(@RequestHeader("Authorization") String token,
                                                                 @PathVariable Long id) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        InquiryResponseDto dto = inquiryService.getMyInquiryDetail(id, user.getUserId());
        return ResponseEntity.ok(dto);
    }
}
