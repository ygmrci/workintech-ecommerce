import { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { toast } from "react-toastify";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { fetchProductByIdThunk } from "../store/product/productThunks";
import { addToCart } from "../store/cart/cartActions";
import logo01 from "../assets/shop/logos/shop-logo-1.svg";
import logo02 from "../assets/shop/logos/shop-logo-2.svg";
import logo03 from "../assets/shop/logos/shop-logo-3.svg";
import logo04 from "../assets/shop/logos/shop-logo-4.svg";
import logo05 from "../assets/shop/logos/shop-logo-5.svg";
import logo06 from "../assets/shop/logos/shop-logo-6.svg";

const logos = [logo01, logo02, logo03, logo04, logo05, logo06];

// Reuse same slug helper as ShopPage/Header for consistency
const encodeSeg = (s) => {
  if (!s) return "";
  const map = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    Ç: "c",
    Ğ: "g",
    I: "i",
    İ: "i",
    Ö: "o",
    Ş: "s",
    Ü: "u",
  };
  return String(s)
    .split("")
    .map((ch) => map[ch] || ch)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId: productIdParam, id, gender, categoryName, categoryId } =
    useParams();

  const resolvedProductId = Number(productIdParam || id) || 1;

  const product = useSelector((state) => state.product.selectedProduct);
  const productFetchState = useSelector(
    (state) => state.product.selectedProductFetchState,
  );
  const relatedProducts = useSelector((state) => state.product.productList);

  useEffect(() => {
    dispatch(fetchProductByIdThunk(resolvedProductId));
  }, [dispatch, resolvedProductId]);

  const gallery = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images
        .map((img) => (typeof img === "string" ? img : img && img.url))
        .filter(Boolean);
    }
    if (product.image) return [product.image];
    return [];
  }, [product]);

  const [currentImage, setCurrentImage] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slides: { perView: 1, spacing: 0 },
    defaultAnimation: { duration: 1000 },
    slideChanged(s) {
      setCurrentImage(s.track.details.rel);
    },
  });

  const [selectedSize, setSelectedSize] = useState(null);

  const availableSizes = useMemo(() => {
    // If backend provides explicit size options in the product, prefer them
    if (Array.isArray(product?.sizes) && product.sizes.length > 0) {
      return product.sizes;
    }

    // Fallback numeric sizes commonly used for shoes/clothing
    return ["36", "37", "38", "39", "40", "41", "42"];
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warn("Lütfen bir beden seçiniz.");
      return;
    }
    dispatch(addToCart(product, selectedSize));
    toast.success("Ürün sepete eklendi.");
  };

  const handleBack = () => {
    if (gender && categoryName && categoryId) {
      history.push(`/shop/${gender}/${categoryName}/${categoryId}`);
    } else {
      history.goBack();
    }
  };

  if (productFetchState === "FETCHING" || !product) {
    return (
      <div className="w-full flex items-center justify-center py-16 text-[#737373]">
        <div className="h-8 w-8 rounded-full border-2 border-[#E6E6E6] border-t-[#23A6F0] animate-spin mr-3" />
        <span>Yükleniyor...</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <section className="w-full bg-[#FAFAFA]">
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
          <div className="flex items-center justify-between md:justify-between gap-4 text-sm text-[#737373]">
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-[#E6E6E6] rounded text-[#252B42] hover:bg-[#252B42] hover:text-white transition-colors text-xs md:text-sm"
            >
              Back
            </button>
            <div className="flex items-center gap-2">
              <Link to="/" className="text-[#252B42] font-semibold">
                Home
              </Link>
              <span className="text-[#BDBDBD]">{">"}</span>
              <Link
                to={
                  gender && categoryName && categoryId
                    ? `/shop/${gender}/${categoryName}/${categoryId}`
                    : "/shop"
                }
                className="text-[#252B42] font-semibold"
              >
                Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col gap-[30px] md:flex-row md:gap-[30px]">
            <div className="w-full md:w-1/2">
              <div className="relative w-full max-w-[506px] h-[450px] bg-[#F5F5F5] rounded-lg overflow-hidden mx-auto md:mx-0">
                <div
                  key={resolvedProductId}
                  ref={sliderRef}
                  className="keen-slider w-full h-full"
                >
                  {(gallery.length ? gallery : [product.image]).map(
                    (img, idx) => (
                      <div
                        key={`slide-${idx}`}
                        className="keen-slider__slide w-full h-full"
                      >
                        <img
                          src={img}
                          alt="Product"
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    ),
                  )}
                </div>
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-transparent text-white flex items-center justify-center"
                  onClick={() => {
                    instanceRef.current?.prev();
                  }}
                >
                  <ChevronLeft size={62} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-transparent text-white flex items-center justify-center"
                  onClick={() => {
                    instanceRef.current?.next();
                  }}
                >
                  <ChevronRight size={62} />
                </button>
              </div>
              {gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={`thumb-${idx}`}
                      type="button"
                      className={`w-full h-[70px] sm:h-[86px] bg-[#F5F5F5] rounded overflow-hidden ${
                        currentImage === idx
                          ? "ring-2 ring-[#23A6F0]"
                          : "ring-1 ring-transparent"
                      }`}
                      aria-label={`Product thumbnail ${idx + 1}`}
                      onClick={() => {
                        instanceRef.current?.moveToIdx(idx);
                      }}
                    >
                      <img
                        src={img}
                        alt={`Product thumbnail ${idx + 1}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <h1 className="text-[24px] md:text-[30px] font-bold text-[#252B42]">
                {product.title || product.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#737373]">
                <div className="flex items-center gap-1 text-[#F3CD03]">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={`star-${idx}`}
                      size={14}
                      fill="#F3CD03"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span className="text-[#737373]">
                  {product.rating ? product.rating.toFixed(2) : "-"} Rating
                </span>
              </div>
              <p className="text-[20px] font-bold text-[#252B42]">
                {typeof product.price === "string"
                  ? product.price
                  : `$${Number(product.price ?? product.priceValue ?? 0).toFixed(2)}`}
              </p>
              <p className="text-[14px] text-[#737373]">
                Availability :{" "}
                <span className="text-[#23A6F0] font-semibold">
                  {product.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p className="text-[14px] text-[#737373] leading-[22px] max-w-[280px] sm:max-w-[360px] md:max-w-[420px]">
                {product.description ||
                  "No description is available for this product."}
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <span className="text-[14px] font-semibold text-[#252B42]">
                  Beden Seçimi
                </span>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] px-3 py-2 text-[13px] rounded border transition-colors ${
                        selectedSize === size
                          ? "border-[#23A6F0] bg-[#23A6F0] text-white"
                          : "border-[#E6E6E6] text-[#252B42] bg-white hover:border-[#23A6F0]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="h-[52px] px-8 bg-[#23A6F0] text-white text-sm font-semibold rounded"
                >
                  Sepete Ekle
                </button>
                <button
                  className="h-[52px] w-[52px] border border-[#E6E6E6] rounded"
                  aria-label="Add to favorites"
                >
                  <Heart size={18} className="mx-auto text-[#252B42]" />
                </button>
                <button
                  className="h-[52px] w-[52px] border border-[#E6E6E6] rounded"
                  aria-label="Add to cart"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} className="mx-auto text-[#252B42]" />
                </button>
                <button
                  className="h-[52px] w-[52px] border border-[#E6E6E6] rounded"
                  aria-label="View details"
                >
                  <Eye size={18} className="mx-auto text-[#252B42]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white border-t border-[#ECECEC]">
        <div className="w-full max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center justify-center gap-8 text-[14px] text-[#737373]">
            <button className="font-semibold text-[#252B42]">Description</button>
            <button className="hover:text-[#252B42]">
              Additional Information
            </button>
            <button className="hover:text-[#252B42]">Reviews (0)</button>
          </div>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:gap-10">
            <div className="w-full md:w-[40%]">
              <img
                src={gallery[0] || product.image}
                alt="Product detail"
                className="w-full h-[260px] sm:h-[320px] md:h-[380px] object-contain rounded-lg bg-white"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-[32%] px-4 md:px-0 flex flex-col gap-5 md:gap-6 text-[#737373] text-[14px] leading-[20px] tracking-[0.2px] md:max-w-[332px] md:min-h-[340px]">
              <div className="flex flex-col gap-3">
                <h3 className="text-[#252B42] font-bold text-[16px]">
                  Product details
                </h3>
                <p>Category ID: {product.category_id ?? product.categoryId}</p>
              </div>
              <p>Store ID: {product.store_id ?? product.storeId ?? "-"}</p>
              <p>Sold: {product.sell_count ?? product.sellCount ?? "-"}</p>
            </div>
            <div className="w-full md:w-[332px] md:flex-none px-4 md:px-0 flex flex-col gap-5 md:gap-[30px] text-[#737373] text-[14px] leading-[22px]">
              <div className="flex flex-col gap-3 rounded-[9px]">
                <h3 className="text-[#252B42] font-bold text-[16px]">
                  Highlights
                </h3>
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                      key={`desc-item-${idx}`}
                      className="flex items-center gap-2"
                    >
                      <ChevronRight size={16} className="text-[#737373]" />
                      <span className="text-[13px] sm:text-[14px] font-semibold text-[#737373] whitespace-nowrap">
                        Rating: {product.rating ? product.rating.toFixed(2) : "-"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-[9px]">
                <h3 className="text-[#252B42] font-bold text-[16px]">
                  Stock & shipping
                </h3>
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={`desc-item-bottom-${idx}`}
                      className="flex items-center gap-2"
                    >
                      <ChevronRight size={16} className="text-[#737373]" />
                      <span className="text-[13px] sm:text-[14px] font-semibold text-[#737373] whitespace-nowrap">
                        Stock: {product.stock ?? "-"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA] border-y border-[#E6E6E6]">
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-[20px] md:text-[24px] font-bold text-[#252B42] text-center">
            BESTSELLER PRODUCTS
          </h2>
          <div className="mt-10 flex flex-wrap gap-6 justify-center md:justify-start">
            {(relatedProducts || []).slice(0, 8).map((related) => (
              <div key={related.id} className="w-full md:w-[calc(25%-18px)]">
                <ProductCard
                  id={related.id}
                  image={related.image}
                  title={related.title}
                  department={related.department}
                  price={related.price}
                  discountPrice={related.discountPrice}
                  colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
                  to={
                    gender && categoryName && categoryId
                      ? `/shop/${gender}/${categoryName}/${categoryId}/${encodeSeg(
                          related.title || related.name,
                        )}/${related.id}`
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA] border-t border-[#E6E6E6]">
        <div className="w-full max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-6 items-center justify-items-center gap-6">
            {logos.map((logo, index) => (
              <img
                key={`${logo}-${index}`}
                src={logo}
                alt={`Brand logo ${index + 1}`}
                className={`w-auto object-contain ${
                  index === 0 ? "h-10" : index === 5 ? "h-16" : "h-14"
                }`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
