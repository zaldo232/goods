package zaldo.goods.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zaldo.goods.backend.dto.InquiryAnswerRequestDto;
import zaldo.goods.backend.dto.InquiryRequestDto;
import zaldo.goods.backend.dto.InquiryResponseDto;
import zaldo.goods.backend.entity.Inquiry;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.enums.InquiryStatus;
import zaldo.goods.backend.repository.InquiryRepository;
import zaldo.goods.backend.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    // 문의 등록
    public void createInquiry(InquiryRequestDto dto, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        Inquiry inquiry = new Inquiry();
        inquiry.setUser(user);
        inquiry.setTitle(dto.getTitle());
        inquiry.setContent(dto.getContent());
        inquiry.setStatus(InquiryStatus.PENDING);
        inquiryRepository.save(inquiry);
    }

    // 내 문의 목록 조회
    public List<InquiryResponseDto> getMyInquiries(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        return inquiryRepository.findByUser(user).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 내 문의 상세 조회
    public InquiryResponseDto getMyInquiryDetail(Long inquiryId, Long userId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new RuntimeException("문의가 존재하지 않습니다."));
        if (!inquiry.getUser().getUserId().equals(userId)) {
            throw new RuntimeException("자신의 문의만 조회할 수 있습니다.");
        }
        return toDto(inquiry);
    }

    // 관리자 답변 등록
    @Transactional
    public void answerInquiry(Long inquiryId, InquiryAnswerRequestDto dto) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new RuntimeException("문의가 존재하지 않습니다."));
        inquiry.setResponse(dto.getResponse());
        inquiry.setStatus(InquiryStatus.ANSWERED);
    }

    // 변환 메서드
    private InquiryResponseDto toDto(Inquiry inquiry) {
        InquiryResponseDto dto = new InquiryResponseDto();
        dto.setInquiryId(inquiry.getInquiryId());
        dto.setTitle(inquiry.getTitle());
        dto.setContent(inquiry.getContent());
        dto.setResponse(inquiry.getResponse());
        dto.setStatus(inquiry.getStatus());
        dto.setCreatedAt(inquiry.getCreatedAt());
        dto.setUpdatedAt(inquiry.getUpdatedAt());
        return dto;
    }

    // 전체 문의 목록 (관리자용)
    public List<InquiryResponseDto> getAllInquiries() {
        return inquiryRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 문의 상세 조회 (관리자용)
    public InquiryResponseDto getInquiryDetail(Long inquiryId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new RuntimeException("문의가 존재하지 않습니다."));
        return toDto(inquiry);
    }

}
