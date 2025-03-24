package zaldo.goods.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import zaldo.goods.backend.dto.AddToWishlistRequest;
import zaldo.goods.backend.dto.WishlistResponse;
import zaldo.goods.backend.entity.Product;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.entity.Wishlist;
import zaldo.goods.backend.repository.ProductRepository;
import zaldo.goods.backend.repository.WishlistRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    // 찜 추가
    @Transactional
    public void addToWishlist(User user, AddToWishlistRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        boolean alreadyExists = wishlistRepository
                .findByUserUserIdAndProductProductId(user.getUserId(), product.getProductId())
                .isPresent();

        if (alreadyExists) {
            throw new IllegalArgumentException("이미 찜한 상품입니다.");
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setProduct(product);
        wishlistRepository.save(wishlist);
    }

    // 찜 삭제
    @Transactional
    public void removeFromWishlist(User user, Long productId) {
        wishlistRepository.deleteByUserUserIdAndProductProductId(user.getUserId(), productId);
    }

    // 찜 목록 조회
    public List<WishlistResponse> getWishlist(User user) {
        return wishlistRepository.findByUserUserId(user.getUserId()).stream()
                .map(w -> {
                    Product p = w.getProduct();
                    return new WishlistResponse(
                            p.getProductId(),
                            p.getName(),
                            p.getDescription(),
                            p.getPrice()
                    );
                })
                .collect(Collectors.toList());
    }
}
