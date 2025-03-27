package zaldo.goods.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zaldo.goods.backend.dto.NoticeRequestDto;
import zaldo.goods.backend.dto.NoticeResponseDto;
import zaldo.goods.backend.service.NoticeService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/notices")
@RequiredArgsConstructor
public class AdminNoticeController {

    private final NoticeService noticeService;

    // 전체 목록 (관리자도 같이 씀)
    @GetMapping
    public ResponseEntity<List<NoticeResponseDto>> getAllNotices() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    // 공지 등록
    @PostMapping
    public ResponseEntity<Void> createNotice(@RequestBody NoticeRequestDto dto) {
        noticeService.createNotice(dto);
        return ResponseEntity.ok().build();
    }

    // 공지 상세
    @GetMapping("/{id}")
    public ResponseEntity<NoticeResponseDto> getNotice(@PathVariable Long id) {
        return ResponseEntity.ok(noticeService.getNotice(id));
    }

    // 공지 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateNotice(@PathVariable Long id,
                                             @RequestBody NoticeRequestDto dto) {
        noticeService.updateNotice(id, dto);
        return ResponseEntity.ok().build();
    }

    // 공지 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.ok().build();
    }
}
