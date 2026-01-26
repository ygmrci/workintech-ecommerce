import { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import logo01 from "../assets/shop/logos/shop-logo-1.png";
import logo02 from "../assets/shop/logos/shop-logo-2.png";
import logo03 from "../assets/shop/logos/shop-logo-3.png";
import logo04 from "../assets/shop/logos/shop-logo-4.png";
import logo05 from "../assets/shop/logos/shop-logo-5.png";
import logo06 from "../assets/shop/logos/shop-logo-6.png";

const productCatalog = products;

const logos = [logo01, logo02, logo03, logo04, logo05, logo06];

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id) || 1;
  const product =
    productCatalog.find((item) => item.id === productId) || productCatalog[0];
  const productIndex = productCatalog.findIndex(
    (item) => item.id === product.id
  );
  const gallery = useMemo(() => {
    const total = productCatalog.length;
    const indices = [
      productIndex,
      (productIndex + 1) % total,
      (productIndex + 2) % total,
      (productIndex + 3) % total,
    ];
    return indices.map((idx) => productCatalog[idx].image);
  }, [productIndex]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const loadingTimerRef = useRef(null);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slides: { perView: 1, spacing: 0 },
    defaultAnimation: { duration: 1000 },
    slideChanged(s) {
      setCurrentImage(s.track.details.rel);
      setIsImageLoading(true);
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      loadingTimerRef.current = setTimeout(() => {
        setIsImageLoading(false);
        loadingTimerRef.current = null;
      }, 400);
    },
  });
  return (
    <div className="w-full flex flex-col">
      <section className="w-full bg-[#FAFAFA]">
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-[#737373]">
            <Link to="/" className="text-[#252B42] font-semibold">
              Home
            </Link>
            <span className="text-[#BDBDBD]">{">"}</span>
            <Link to="/shop" className="text-[#252B42] font-semibold">
              Shop
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col gap-[30px] md:flex-row md:gap-[30px]">
            <div className="w-full md:w-1/2">
              <div className="relative w-full max-w-[506px] h-[450px] bg-[#F5F5F5] rounded-lg overflow-hidden mx-auto md:mx-0">
                <div
                  key={productId}
                  ref={sliderRef}
                  className="keen-slider w-full h-full"
                >
                  {gallery.map((img, idx) => (
                    <div
                      key={`slide-${idx}`}
                      className="keen-slider__slide w-full h-full"
                    >
                      <img
                        src={img}
                        alt="Product"
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onLoad={() => {
                          if (idx === currentImage) {
                            setIsImageLoading(false);
                          }
                        }}
                        onError={() => {
                          setIsImageLoading(false);
                        }}
                      />
                    </div>
                  ))}
                </div>
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-[#737373] text-sm">
                    Yükleniyor...
                  </div>
                )}
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-transparent text-white flex items-center justify-center"
                  onClick={() => {
                    setIsImageLoading(true);
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
                    setIsImageLoading(true);
                    instanceRef.current?.next();
                  }}
                >
                  <ChevronRight size={62} />
                </button>
              </div>
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
                      setIsImageLoading(true);
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
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <h1 className="text-[24px] md:text-[30px] font-bold text-[#252B42]">
                {product.title}
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
                <span className="text-[#737373]">10 Reviews</span>
              </div>
              <p className="text-[20px] font-bold text-[#252B42]">
                {product.price}
              </p>
              <p className="text-[14px] text-[#737373]">
                Availability :{" "}
                <span className="text-[#23A6F0] font-semibold">In Stock</span>
              </p>
              <p className="text-[14px] text-[#737373] leading-[22px] max-w-[420px]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent. RELIT official consequent door ENIM RELIT Mollie.
                Excitation venial consequent sent nostrum met.
              </p>

              <div className="flex items-center gap-3">
                {["#23A6F0", "#2DC071", "#E77C40", "#252B42"].map((c) => (
                  <span
                    key={c}
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button className="h-[52px] px-8 bg-[#23A6F0] text-white text-sm font-semibold rounded">
                  Select Options
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
            <button className="hover:text-[#252B42]">Additional Information</button>
            <button className="hover:text-[#252B42]">Reviews (0)</button>
          </div>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:gap-10">
            <div className="w-full md:w-[45%]">
              <img
                src={product.image}
                alt="Product detail"
                className="w-full h-[300px] sm:h-[340px] md:h-[400px] object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-[55%] flex flex-col gap-6 text-[#737373] text-[14px] leading-[22px]">
              <div className="flex flex-col gap-3">
                <h3 className="text-[#252B42] font-bold text-[16px]">
                  the quick fox jumps over
                </h3>
                <p>
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met
                  sent. RELIT official consequent door ENIM RELIT Mollie.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[#252B42] font-bold text-[16px]">
                  the quick fox jumps over
                </h3>
                <p>
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met
                  sent. RELIT official consequent door ENIM RELIT Mollie.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-[#252B42] font-bold text-[16px]">
                  the quick fox jumps over
                </h3>
                <p>
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met
                  sent. RELIT official consequent door ENIM RELIT Mollie.
                </p>
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
            {productCatalog.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="w-full md:w-[calc(25%-18px)]"
              >
                <ProductCard
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  department={product.department}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
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
