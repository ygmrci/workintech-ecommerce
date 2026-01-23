import React from "react";
import { useKeenSlider } from "keen-slider/react";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import editorMen from "../assets/home/editor/editor-men.jpg";
import editorWomen from "../assets/home/editor/editor-women.jpg";
import editorAccessories from "../assets/home/editor/editor-accessories.jpg";
import editorKids from "../assets/home/editor/editor-kids.jpg";
import product01 from "../assets/home/products/product-01.jpg";
import product02 from "../assets/home/products/product-02.jpg";
import product03 from "../assets/home/products/product-03.jpg";
import product04 from "../assets/home/products/product-04.jpg";
import product05 from "../assets/home/products/product-05.jpg";
import product06 from "../assets/home/products/product-06.jpg";
import product07 from "../assets/home/products/product-07.jpg";
import product08 from "../assets/home/products/product-08.jpg";
import bannerVita from "../assets/home/banners/banner-vita.png";
import bannerVita2 from "../assets/home/banners/banner-vita-2.png";
import promoCouple from "../assets/home/banners/promo-couple.png";
import post01 from "../assets/home/posts/post-01.jpg";
import post02 from "../assets/home/posts/post-02.jpg";
import post03 from "../assets/home/posts/post-03.jpg";
import commentsIcon from "../assets/home/posts/comments-icon.png";

const editorCards = [
  {
    id: "men",
    label: "MEN",
    image: editorMen,
  },
  {
    id: "women",
    label: "WOMEN",
    image: editorWomen,
  },
  {
    id: "accessories",
    label: "ACCESSORIES",
    image: editorAccessories,
  },
  {
    id: "kids",
    label: "KIDS",
    image: editorKids,
  },
];

const products = [
  {
    id: 1,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product01,
  },
  {
    id: 2,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product02,
  },
  {
    id: 3,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product03,
  },
  {
    id: 4,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product04,
  },
  {
    id: 5,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product05,
  },
  {
    id: 6,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product06,
  },
  {
    id: 7,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product07,
  },
  {
    id: 8,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product08,
  },
];

const posts = [
  {
    id: 1,
    image: post01,
    title: "Loudest à la Madison #1 (L'intégral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
  {
    id: 2,
    image: post02,
    title: "Loudest à la Madison #1 (L'intégral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
  {
    id: 3,
    image: post03,
    title: "Loudest à la Madison #1 (L'intégral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
];

const vitaSlides = [
  {
    id: "vita-1",
    variant: "product",
    kicker: "SUMMER 2020",
    title: "Vita Classic\nProduct",
    description:
      "We know how large objects will act, We know how are objects will act, We know",
    price: "$16.48",
    cta: "ADD TO CART",
    image: bannerVita,
    bgColor: "#23856D",
    height: 783,
    textOffsetY: 24,
  },
  {
    id: "vita-2",
    variant: "hero",
    kicker: "SUMMER 2020",
    title: "IT'S A SPECIAL\nGIFT",
    description:
      "We know how large objects will act, but things on a small scale.",
    cta: "SHOP NOW",
    bgImage: bannerVita2,
    bgColor: "#A9B0B9",
    textColor: "text-white",
    buttonClass: "bg-[#23A6F0] text-white",
    height: 753,
    textOffsetY: 24,
    bgPosition: "center",
    bgSize: "cover",
  },
];

export default function HomePage() {
  const [vitaSlide, setVitaSlide] = React.useState(0);
  const [vitaRef, vitaInstance] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 0 },
    defaultAnimation: { duration: 1000 },
    slideChanged(s) {
      setVitaSlide(s.track.details.rel);
    },
  });

  return (
    <div className="w-full flex flex-col">
      <section className="w-full">
        <Slider />
      </section>

      <section className="w-full py-12">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-4 px-4">
          <div className="text-center w-full max-w-[607px] flex flex-col gap-[10px] md:max-w-none">
            <h3 className="text-[24px] font-bold text-[#252B42] leading-[32px]">
              EDITOR&apos;S PICK
            </h3>
            <p className="text-[14px] text-[#737373] leading-[20px] md:max-w-[347px] mx-auto">
              Problems trying to resolve the conflict between
            </p>
          </div>

          <div className="w-full flex flex-col gap-6 md:flex-row md:justify-center">
            <button
              type="button"
              className="group relative w-[324px] h-[500px] md:w-[510px] md:h-[500px] mx-auto"
            >
              <img
                src={editorCards[0].image}
                alt={editorCards[0].label}
                className="w-full h-full object-cover group-hover:opacity-90"
              />
              <span className="absolute left-4 bottom-4 bg-white px-6 py-2 text-sm font-bold text-[#252B42] group-hover:bg-[#252B42] group-hover:text-white transition-colors">
                {editorCards[0].label}
              </span>
            </button>

            <button
              type="button"
              className="group relative w-[324px] h-[500px] md:w-[240px] md:h-[500px] mx-auto"
            >
              <img
                src={editorCards[1].image}
                alt={editorCards[1].label}
                className="w-full h-full object-cover group-hover:opacity-90"
              />
              <span className="absolute left-4 bottom-4 bg-white px-6 py-2 text-sm font-bold text-[#252B42] group-hover:bg-[#252B42] group-hover:text-white transition-colors">
                {editorCards[1].label}
              </span>
            </button>

            <div className="w-full md:w-[240px] flex flex-col gap-4">
              <button
                type="button"
                className="group relative w-[325px] h-[242px] md:w-full md:h-[242px] mx-auto"
              >
                <img
                  src={editorCards[2].image}
                  alt={editorCards[2].label}
                  className="w-full h-full object-cover group-hover:opacity-90"
                />
                <span className="absolute left-4 bottom-4 bg-white px-5 py-2 text-sm font-bold text-[#252B42] group-hover:bg-[#252B42] group-hover:text-white transition-colors">
                  {editorCards[2].label}
                </span>
              </button>
              <button
                type="button"
                className="group relative w-[325px] h-[242px] md:w-full md:h-[242px] mx-auto"
              >
                <img
                  src={editorCards[3].image}
                  alt={editorCards[3].label}
                  className="w-full h-full object-cover group-hover:opacity-90"
                />
                <span className="absolute left-4 bottom-4 bg-white px-5 py-2 text-sm font-bold text-[#252B42] group-hover:bg-[#252B42] group-hover:text-white transition-colors">
                  {editorCards[3].label}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center w-full max-w-[279px] md:max-w-[500px] mx-auto flex flex-col gap-[10px]">
            <p className="text-[14px] text-[#737373]">Featured Products</p>
            <h3 className="text-[24px] font-bold text-[#252B42]">
              BESTSELLER PRODUCTS
            </h3>
            <p className="text-[14px] text-[#737373]">
              Problems trying to resolve the conflict between
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-[calc(25%-18px)]"
              >
                <ProductCard
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

      <section className="w-full relative">
        <div ref={vitaRef} className="keen-slider w-full">
          {vitaSlides.map((slide) => {
            const textColor = slide.textColor || "text-white";
            const descColor =
              slide.descColor ||
              (textColor === "text-white" ? "text-white/80" : "text-[#737373]");

            return (
              <div
                key={slide.id}
                className="keen-slider__slide w-full min-w-full"
                style={{ minHeight: `${slide.height || 700}px` }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: slide.bgColor || "#23856D",
                    backgroundImage: slide.bgImage
                      ? `url(${slide.bgImage})`
                      : undefined,
                    backgroundSize: slide.bgImage
                      ? slide.bgSize || "cover"
                      : undefined,
                    backgroundPosition: slide.bgImage
                      ? slide.bgPosition || "center right"
                      : undefined,
                    minHeight: `${slide.height || 700}px`,
                  }}
                >
                  <div
                    className={`w-full px-4 flex flex-col md:flex-row items-center justify-center gap-6 ${
                      slide.id === "vita-2" ? "md:gap-12" : "md:gap-4"
                    } relative pb-[300px] sm:pb-[320px] md:pb-0`}
                  >
                    <div
                      className={
                        slide.id === "vita-2" ? "md:-translate-x-52" : ""
                      }
                    >
                      <div
                        className={`w-full md:w-[509px] flex flex-col gap-[30px] md:pt-[60px] md:h-[432px] ${textColor} items-center text-center md:items-start md:text-left order-1 md:order-1 md:translate-y-16`}
                        style={{
                          transform: `translateY(${slide.textOffsetY || 0}px)`,
                        }}
                      >
                        <p className="text-[12px] tracking-widest mt-4">
                          {slide.kicker}
                        </p>
                        <h3 className="text-[40px] md:text-[58px] leading-[52px] md:leading-[80px] font-bold tracking-[0.2px] whitespace-pre-line">
                          {slide.title}
                        </h3>
                        <p
                          className={`text-[20px] leading-[30px] tracking-[0.2px] max-w-[291px] ${descColor} ${
                            slide.variant === "product"
                              ? "md:text-[14px] md:leading-[20px] md:max-w-none md:whitespace-pre-line"
                              : ""
                          }`}
                        >
                          {slide.variant === "product" ? (
                            <>
                              <span className="md:hidden">
                                {slide.description}
                              </span>
                              <span className="hidden md:inline">
                                We know how large objects will act, We know
                                <br />
                                how are objects will act, We know
                              </span>
                            </>
                          ) : (
                            slide.description
                          )}
                        </p>
                        <div className="flex flex-col items-center gap-4 justify-center md:flex-row md:gap-6 md:justify-start">
                          {slide.price && (
                            <span className="text-[20px] font-bold">
                              {slide.price}
                            </span>
                          )}
                          <button
                            className={`px-6 py-3 text-sm font-semibold rounded-none ${
                              slide.buttonClass || "bg-[#2DC071] text-white"
                            }`}
                          >
                            {slide.cta}
                          </button>
                        </div>
                      </div>
                    </div>
                    {slide.image && (
                      <div className="absolute left-0 bottom-0 w-[56%] max-w-[260px] sm:w-[48%] sm:max-w-none md:static md:left-0 md:w-[450px] md:h-[700px] flex items-end justify-start md:justify-end order-2 md:order-2 -translate-x-[6px] sm:-translate-x-[4px] md:-translate-x-[24px] translate-y-[92px] sm:translate-y-[34px] md:translate-y-[84px]">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-auto md:h-full md:w-full object-contain translate-y-0 md:translate-y-12"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => vitaInstance.current?.prev()}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white"
          aria-label="Previous vita slide"
        >
          <ChevronLeft size={36} />
        </button>
        <button
          type="button"
          onClick={() => vitaInstance.current?.next()}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white"
          aria-label="Next vita slide"
        >
          <ChevronRight size={36} />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[126px] h-[10px] flex items-center gap-2">
          {vitaSlides.map((_, idx) => (
            <div
              key={`vita-indicator-${idx}`}
              className={`flex-1 h-[2px] ${
                vitaSlide === idx ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="w-full py-14">
        <div className="w-full max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row gap-8 items-center md:gap-16">
          <div className="w-full h-[410px] md:w-[704px] md:h-[682px] flex items-end justify-center px-2 md:px-4">
            <img
              src={promoCouple}
              alt="Part of the Neural Universe"
              className="w-full h-full object-cover -translate-x-3 md:translate-x-0 md:-translate-y-28"
            />
          </div>
          <div className="w-full md:w-[510px] flex flex-col gap-4 text-center md:text-left items-center md:items-start pb-6 md:pb-0">
            <p className="text-[14px] text-[#BDBDBD] tracking-widest">
              SUMMER 2020
            </p>
            <h3 className="text-[40px] leading-[50px] font-bold tracking-[0.2px] text-[#252B42] max-w-[303px] md:max-w-none mx-auto md:mx-0">
              Part of the Neural Universe
            </h3>
            <p className="text-[20px] leading-[30px] font-normal tracking-[0.2px] text-[#737373] max-w-[262px] md:max-w-md mx-auto md:mx-0">
              We know how large objects will act, but things on a small scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-[10px] sm:gap-4">
              <button className="w-[151px] py-[15px] bg-[#23A6F0] text-white text-sm font-semibold rounded-[5px] text-center">
                BUY NOW
              </button>
              <button className="w-[151px] py-[15px] border border-[#23A6F0] text-[#23A6F0] text-sm font-semibold rounded-[5px] text-center">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-[#FAFAFA]">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-[14px] text-[#23A6F0]">Practice Advice</p>
            <h3 className="text-[40px] leading-[50px] font-bold tracking-[0.2px] text-[#252B42] mt-2 whitespace-pre-line max-w-[239px] mx-auto md:max-w-none">
              <span className="md:hidden">{"Featured\nPosts"}</span>
              <span className="hidden md:inline">Featured Posts</span>
            </h3>
            <p className="text-[14px] text-[#737373] mt-2 whitespace-pre-line max-w-[469px] mx-auto">
              <span className="md:hidden">
                {"Problems trying to resolve the\nconflict between the two major"}
              </span>
              <span className="hidden md:inline">
                Problems trying to resolve the conflict between
                <br />
                the two major realms of Classical physics: Newtonian mechanics
              </span>
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 md:gap-8 justify-center">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white shadow-sm w-[330px] max-w-full mx-auto"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[200px] object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-[#E74040] text-white text-xs px-3 py-1">
                    NEW
                  </span>
                </div>
                <div className="px-[25px] pt-[25px] pb-[35px] flex flex-col gap-[10px]">
                  <div className="flex items-center gap-3 text-[12px] text-[#737373]">
                    <span className="text-[#23A6F0]">Google</span>
                    <span>Trending</span>
                    <span>New</span>
                  </div>
                  <h4 className="text-[20px] leading-[30px] font-normal text-[#252B42] max-w-[247px]">
                    {post.title}
                  </h4>
                  <p className="text-[14px] leading-[20px] tracking-[0.2px] font-normal text-[#737373] max-w-[280px]">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-[12px] text-[#737373]">
                    <span className="flex items-center gap-2">
                      <Clock size={14} className="text-[#23A6F0]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <img
                        src={commentsIcon}
                        alt="Comments"
                        className="w-4 h-[14.67px]"
                      />
                      {post.comments} comments
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-[14px] font-semibold text-[#737373]">
                    Learn More <ChevronRight className="text-[#23A6F0]" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
