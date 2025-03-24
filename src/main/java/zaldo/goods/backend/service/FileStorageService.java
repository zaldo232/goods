package zaldo.goods.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileStorageService {

    private final String uploadDir = "src/main/resources/static/uploads";

    public String saveFile(MultipartFile file) throws IOException {
        // 저장 경로 생성
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File dest = new File(dir.getAbsolutePath() + File.separator + filename);

        file.transferTo(dest);

        return "/uploads/" + filename;  // 반환은 웹에서 접근할 수 있는 경로
    }
}

