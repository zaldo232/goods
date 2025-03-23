package zaldo.goods.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import zaldo.goods.backend.dto.AddToCartRequest;
import zaldo.goods.backend.dto.CartResponseDto;
import zaldo.goods.backend.dto.UpdateCartRequest;
import zaldo.goods.backend.entity.Cart;
import zaldo.goods.backend.entity.Product;
import zaldo.goods.backend.entity.User;
import zaldo.goods.backend.repository.CartRepository;
import zaldo.goods.backend.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Transactional
    public void addToCart(User user, AddToCartRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("상품을 찾을 수 없습니다."));

        // 기존에 담긴 장바구니 항목 있는지 확인
        Optional<Cart> existingCartItem = cartRepository.findByUserAndProduct(user, product);

        if (existingCartItem.isPresent()) {
            Cart cart = existingCartItem.get();
            cart.setQuantity(cart.getQuantity() + request.getQuantity());
        } else {
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(request.getQuantity());
            cartRepository.save(cart);
        }
    }

    public List<CartResponseDto> getCartItems(User user) {
        return cartRepository.findByUser(user)
                .stream()
                .map(CartResponseDto::fromEntity)
                .toList();
    }

    @Transactional
    public void removeFromCart(User user, Long productId) {
        Optional<Cart> cartItem = cartRepository.findByUserAndProduct(user, new Product(productId));
        if (cartItem.isEmpty()) {
            throw new IllegalArgumentException("장바구니에 해당 상품이 없습니다.");
        }
        cartRepository.delete(cartItem.get());
    }

    @Transactional
    public void updateCartItem(User user, UpdateCartRequest request) {
        Optional<Cart> cartItem = cartRepository.findByUserAndProduct(user, new Product(request.getProductId()));

        if (cartItem.isEmpty()) {
            throw new IllegalArgumentException("장바구니에 해당 상품이 없습니다.");
        }

        Cart cart = cartItem.get();
        int newQty = request.getQuantity();

        if (newQty <= 0) {
            cartRepository.delete(cart);
        } else {
            cart.setQuantity(newQty);
        }
    }



}