package zaldo.goods.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zaldo.goods.backend.dto.FaqRequestDto;
import zaldo.goods.backend.dto.FaqResponseDto;
import zaldo.goods.backend.entity.Faq;
import zaldo.goods.backend.repository.FaqRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;

    // 등록
    public void createFaq(FaqRequestDto dto) {
        Faq faq = new Faq();
        faq.setQuestion(dto.getQuestion());
        faq.setAnswer(dto.getAnswer());
        faqRepository.save(faq);
    }

    // 전체 목록
    public List<FaqResponseDto> getAllFaqs() {
        return faqRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 상세 조회
    public FaqResponseDto getFaq(Long id) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ가 존재하지 않습니다."));
        return toDto(faq);
    }

    // 수정
    @Transactional
    public void updateFaq(Long id, FaqRequestDto dto) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ가 존재하지 않습니다."));
        faq.setQuestion(dto.getQuestion());
        faq.setAnswer(dto.getAnswer());
    }

    // 삭제
    public void deleteFaq(Long id) {
        faqRepository.deleteById(id);
    }

    private FaqResponseDto toDto(Faq faq) {
        FaqResponseDto dto = new FaqResponseDto();
        dto.setFaqId(faq.getFaqId());
        dto.setQuestion(faq.getQuestion());
        dto.setAnswer(faq.getAnswer());
        dto.setCreatedAt(faq.getCreatedAt());
        dto.setUpdatedAt(faq.getUpdatedAt());
        return dto;
    }
}
