import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "../assets/home/hero/hero-1.jpg";
import hero2 from "../assets/home/hero/hero-2.jpg";
import hero3 from "../assets/home/hero/hero-3.png";

const slides = [
  {
    id: 1,
    img: hero1,
    kicker: "SUMMER 2020",
    title: "NEW COLLECTION",
    desc: "We know how large objects will act,\nbut things on a small scale.",
    cta: "SHOP NOW",
    position: "center 50%",
    height: 700,
  },
  {
    id: 2,
    img: hero2,
    kicker: "WINTER 2020",
    title: "BLACK FRIDAY",
    desc: "Discover trending styles\nfor the new season.",
    cta: "EXPLORE",
    position: "center",
    align: "center",
    offsetY: 100,
    height: 700,
  },
  {
    id: 3,
    img: hero3,
    kicker: "SUMMER 2020",
    title: "NEW COLLECTION",
    desc: "We know how large objects will act,\nbut things on a small scale.",
    cta: "SHOP NOW",
    gradient: "linear-gradient(90deg, #96E9FB 0%, #ABECD6 100%)",
    theme: "light",
    buttonClass: "bg-[#23A6F0] text-white",
    variant: "card",
    cardRadius: 20,
    cardHeight: 700,
    imageOffsetY: 80,
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 0 },
    defaultAnimation: { duration: 1000 },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  return (
    <div className="w-full flex flex-col relative overflow-hidden">
      <div ref={sliderRef} className="keen-slider w-full overflow-hidden">
        {slides.map((s) => (
          <div key={s.id} className="keen-slider__slide w-full min-w-full">
            {s.variant === "card" ? (
              <div className="w-full h-[700px] flex items-center justify-center bg-white px-4">
                <div
                  className="w-full max-w-[1292px] flex items-center rounded-[20px] overflow-hidden px-6 md:px-10"
                  style={{
                    height: `${s.cardHeight || 622}px`,
                    backgroundImage: s.gradient,
                  }}
                >
                  <div className="flex-1 flex flex-col gap-4">
                    <p className="text-[12px] tracking-widest font-semibold text-[#252B42]">
                      {s.kicker}
                    </p>
                    <h2 className="text-[40px] md:text-[46px] font-extrabold text-[#252B42]">
                      {s.title}
                    </h2>
                    <p className="text-[14px] text-[#737373] max-w-md">
                      {s.desc}
                    </p>
                    <button className="w-fit px-8 py-3 text-sm font-semibold rounded-none bg-[#23A6F0] text-white">
                      {s.cta}
                    </button>
                  </div>
                  <div className="flex-1 h-full flex items-end justify-end">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full object-contain"
                      style={{
                        transform: `translateY(${s.imageOffsetY || 0}px)`,
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="w-full flex items-center"
                style={{
                  height: `${s.height || 700}px`,
                  backgroundImage: s.img ? `url(${s.img})` : undefined,
                  backgroundSize: s.bgSize || "cover",
                  backgroundPosition: s.position || "center",
                  backgroundRepeat: s.bgRepeat || "no-repeat",
                }}
              >
                {/* overlay */}
                <div
                  className={`w-full h-full flex items-center ${
                    s.img
                      ? s.theme === "light"
                        ? "bg-transparent"
                        : "bg-black/30"
                      : "bg-[#2A7CC7]"
                  }`}
                >
                  <div
                    className={`w-full max-w-6xl mx-auto flex items-center px-6 md:px-10 ${
                      s.align === "center" ? "justify-center" : ""
                    }`}
                  >
                    <div
                      className={`flex flex-col max-w-xl ${
                        s.align === "center" ? "items-center text-center" : ""
                      }`}
                      style={{
                        transform: `translateY(${s.offsetY || 0}px)`,
                      }}
                    >
                      <p
                        className={`text-[12px] tracking-widest font-semibold ${
                          s.theme === "light"
                            ? "text-[#252B42]"
                            : "text-white/90"
                        }`}
                      >
                        {s.kicker}
                      </p>

                      <h2
                        className={`mt-4 text-[46px] leading-[1.05] md:text-[64px] md:leading-[1] md:whitespace-nowrap font-extrabold ${
                          s.theme === "light" ? "text-[#252B42]" : "text-white"
                        }`}
                      >
                        {s.title}
                      </h2>

                      <p
                        className={`mt-6 text-[14px] md:text-base whitespace-pre-line max-w-md ${
                          s.theme === "light"
                            ? "text-[#737373]"
                            : "text-white/90"
                        }`}
                      >
                        {s.desc}
                      </p>

                      <button
                        className={`mt-8 w-fit px-8 py-3 text-sm font-semibold rounded-none ${
                          s.buttonClass || "bg-[#2DC071] text-white"
                        }`}
                      >
                        {s.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 p-3 text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft size={62} />
      </button>

      <button
        type="button"
        onClick={() => instanceRef.current?.next()}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 p-3 text-white"
        aria-label="Next slide"
      >
        <ChevronRight size={62} />
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            type="button"
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-12 h-1 ${
              currentSlide === idx ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
