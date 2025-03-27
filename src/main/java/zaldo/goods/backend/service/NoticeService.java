package zaldo.goods.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zaldo.goods.backend.dto.NoticeRequestDto;
import zaldo.goods.backend.dto.NoticeResponseDto;
import zaldo.goods.backend.entity.Notice;
import zaldo.goods.backend.repository.NoticeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    // 공지 등록
    public void createNotice(NoticeRequestDto dto) {
        Notice notice = new Notice();
        notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
        noticeRepository.save(notice);
    }

    // 전체 공지 목록
    public List<NoticeResponseDto> getAllNotices() {
        return noticeRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 공지 상세
    public NoticeResponseDto getNotice(Long id) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항이 존재하지 않습니다."));
        return toDto(notice);
    }

    // 공지 수정
    @Transactional
    public void updateNotice(Long id, NoticeRequestDto dto) {
        Notice notice = noticeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("공지사항이 존재하지 않습니다."));
        notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
    }

    // 공지 삭제
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }

    // Entity → DTO 변환
    private NoticeResponseDto toDto(Notice notice) {
        NoticeResponseDto dto = new NoticeResponseDto();
        dto.setNoticeId(notice.getNoticeId());
        dto.setTitle(notice.getTitle());
        dto.setContent(notice.getContent());
        dto.setCreatedAt(notice.getCreatedAt());
        dto.setUpdatedAt(notice.getUpdatedAt());
        return dto;
    }
}
