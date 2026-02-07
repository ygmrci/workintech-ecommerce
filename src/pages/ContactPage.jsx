import contactHero from "../assets/contact/contact-hero.png";
import arrowTwo from "../assets/icons/arrow-2.svg";
import phoneIcon from "../assets/icons/phone.png";
import navigateIcon from "../assets/icons/navigate.png";
import messageIcon from "../assets/icons/message.png";
import dmIcon from "../assets/icons/dm.png";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const contactCards = [
  {
    title: "georgia.young@example.com",
    description: "georgia.young@ple.com",
    detail: "Get Support",
    cta: "Submit Request",
    icon: phoneIcon,
    variant: "light",
  },
  {
    title: "georgia.young@example.com",
    description: "georgia.young@ple.com",
    detail: "Get Support",
    cta: "Submit Request",
    icon: navigateIcon,
    variant: "dark",
  },
  {
    title: "georgia.young@example.com",
    description: "georgia.young@ple.com",
    detail: "Get Support",
    cta: "Submit Request",
    icon: messageIcon,
    mobileIcon: dmIcon,
    variant: "light",
  },
];

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      <section className="w-full overflow-visible">
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 overflow-visible">
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 md:min-h-[520px]">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left md:pr-6 md:-mt-14">
              <span className="text-[12px] font-semibold tracking-[1.8px] text-[#252B42]">
                CONTACT US
              </span>
              <h1 className="mt-3 text-[32px] leading-[40px] md:text-[58px] md:leading-[66px] font-bold text-[#252B42]">
                <span className="block">Get in touch</span>
                <span className="block">today!</span>
              </h1>
              <p className="mt-4 text-[14px] leading-[20px] text-[#737373] max-w-[320px] md:max-w-[380px]">
                We know how large objects will act, but things on a small scale.
              </p>
              <div className="mt-4 flex flex-col gap-1 text-[14px] text-[#252B42]">
                <span className="font-semibold">Phone : +451 215 215</span>
                <span className="font-semibold">Fax : +451 215 215</span>
              </div>
              <div className="mt-5 flex items-center justify-center md:justify-start gap-4 text-[#252B42]">
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[34px] w-[34px] items-center justify-center"
                >
                  <Twitter size={20} fill="currentColor" stroke="none" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[34px] w-[34px] items-center justify-center bg-[#252B42] text-white"
                >
                  <Facebook size={20} fill="white" stroke="none" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[34px] w-[34px] items-center justify-center"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[34px] w-[34px] items-center justify-center bg-[#252B42] text-white"
                >
                  <Linkedin size={18} fill="white" stroke="none" />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end md:absolute md:-right-20 md:top-[45%] md:-translate-y-[60%] overflow-visible">
              <img
                src={contactHero}
                alt="Contact"
                className="w-[560px] max-w-none h-auto object-contain relative left-[40%] -translate-x-1/2 scale-[1.04] md:left-auto md:translate-x-0 md:max-w-[1500px] md:scale-[1.75] md:origin-right mx-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA]">
        <div className="w-full max-w-6xl mx-auto px-4 py-10 md:py-16">
          <div className="text-center">
            <p className="text-[14px] font-semibold text-[#252B42]">
              VISIT OUR OFFICE
            </p>
            <h2 className="mt-2 text-[24px] md:text-[40px] font-bold text-[#252B42]">
              <span className="block md:inline">We help small </span>
              <span className="block md:inline">businesses</span>
              <br className="hidden md:block" />
              <span className="block md:inline">with big ideas</span>
            </h2>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-[repeat(3,auto)] md:justify-center gap-0 place-items-center">
            {contactCards.map((card) => {
              const isDark = card.variant === "dark";
              return (
                <div
                  key={card.title}
                  className={`flex flex-col items-center text-center px-6 py-8 pt-12 w-full max-w-[300px] min-h-[380px] ${
                    isDark
                      ? "bg-[#252B42] text-white min-h-[420px]"
                      : "bg-white text-[#252B42]"
                  }`}
                >
                  {card.mobileIcon ? (
                    <>
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="hidden md:block h-[64px] w-[64px] object-contain"
                        loading="lazy"
                      />
                      <img
                        src={card.mobileIcon}
                        alt={card.title}
                        className="block md:hidden h-[64px] w-[64px] object-contain"
                        loading="lazy"
                      />
                    </>
                  ) : (
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="h-[64px] w-[64px] object-contain"
                      loading="lazy"
                    />
                  )}
                  <h3
                    className={`mt-4 text-[16px] font-semibold ${
                      isDark ? "text-white" : "text-[#252B42]"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`mt-2 text-[13px] font-semibold ${
                      isDark ? "text-white" : "text-[#252B42]"
                    }`}
                  >
                    {card.description}
                  </p>
                  <p className="mt-3 text-[14px] font-semibold text-center">
                    {card.detail}
                  </p>
                  <button
                    className={`mt-4 h-[44px] px-8 rounded-[5px] md:rounded-full text-[12px] font-semibold ${
                      isDark
                        ? "bg-[#252B42] border border-[#23A6F0] text-[#23A6F0]"
                        : "border border-[#23A6F0] text-[#23A6F0]"
                    }`}
                  >
                    {card.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center h-[30px]">
            <img
              src={arrowTwo}
              alt="Arrow"
              className="opacity-100"
              style={{
                width: "100px",
                height: "60px",
                transform: "rotate(-10deg)",
              }}
              loading="lazy"
            />
          </div>
          <p className="mt-8 text-[14px] font-semibold text-[#252B42]">
            WE CAN&apos;T WAIT TO MEET YOU
          </p>
          <h3 className="mt-2 text-[32px] md:text-[40px] font-bold text-[#252B42]">
            Let&apos;s Talk
          </h3>
          <button className="mt-5 h-[40px] px-6 rounded-[5px] bg-[#23A6F0] text-white text-[12px] font-semibold">
            Try it free now
          </button>
        </div>
      </section>
    </div>
  );
}
