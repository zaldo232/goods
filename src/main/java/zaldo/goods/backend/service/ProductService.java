package zaldo.goods.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import zaldo.goods.backend.dto.ProductCreateRequest;
import zaldo.goods.backend.dto.ProductUpdateRequest;
import zaldo.goods.backend.entity.Category;
import zaldo.goods.backend.entity.Product;
import zaldo.goods.backend.entity.ProductImage;
import zaldo.goods.backend.repository.CategoryRepository;
import zaldo.goods.backend.repository.ProductImageRepository;
import zaldo.goods.backend.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    // ✅ 상품 전체 목록 조회
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ✅ 상품 ID로 조회
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // ✅ 상품 + 이미지 등록
    public void createProductWithImages(ProductCreateRequest request, List<MultipartFile> images) throws Exception {
        // 1. 카테고리 조회
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("카테고리를 찾을 수 없습니다."));

        // 2. 상품 저장
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setCategory(category);
        Product savedProduct = productRepository.save(product);

        // 3. 이미지 저장
        for (MultipartFile image : images) {
            String imageUrl = fileStorageService.saveFile(image);
            ProductImage productImage = new ProductImage();
            productImage.setProduct(savedProduct);
            productImage.setImageUrl(imageUrl);
            productImageRepository.save(productImage);
        }
    }

    // 관리자
    public void updateProduct(Long id, ProductUpdateRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());

        // 카테고리 변경
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));
        product.setCategory(category);

        productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
        productRepository.delete(product);
    }

}
