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

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    // 추천 상품 조회
    public List<Product> getRecommendedProducts() {
        return productRepository.findByIsRecommendedTrue();
    }

    // 베스트 셀러 조회
    public List<Product> getBestSellers() {
        return productRepository.findTopBestSellers();
    }

    // 상품 전체 목록 조회
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 상품 ID로 조회
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // 상품 + 이미지 등록
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

    public void updateProductWithImages(Long productId, ProductUpdateRequest request, List<MultipartFile> newImages) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("카테고리를 찾을 수 없습니다."));
            product.setCategory(category);
        }

        // 기존 이미지 제거
        productImageRepository.deleteAll(product.getImages());
        product.getImages().clear();

        // 새로운 이미지 저장
        if (newImages != null && !newImages.isEmpty()) {
            for (MultipartFile image : newImages) {
                try {
                    String imageUrl = fileStorageService.saveFile(image);
                    ProductImage productImage = new ProductImage();
                    productImage.setProduct(product);
                    productImage.setImageUrl(imageUrl);
                    product.getImages().add(productImage);
                } catch (IOException e) {
                    throw new RuntimeException("이미지 저장 실패", e);
                }
            }
        }

        productRepository.save(product);
    }

    public List<Product> searchProducts(String keyword, Long categoryId) {
        if (keyword != null && categoryId != null) {
            return productRepository.findByNameContainingAndCategory_CategoryId(keyword, categoryId);
        } else if (keyword != null) {
            return productRepository.findByNameContaining(keyword);
        } else if (categoryId != null) {
            return productRepository.findByCategory_CategoryId(categoryId);
        } else {
            return productRepository.findAll();
        }
    }



}
