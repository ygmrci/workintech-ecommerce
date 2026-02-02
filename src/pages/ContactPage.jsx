import contactHero from "../assets/contact/contact-hero.png";
import arrowDownIcon from "../assets/icons/arrow-down.png";
import phoneIcon from "../assets/icons/phone.png";
import navigateIcon from "../assets/icons/navigate.png";
import messageIcon from "../assets/icons/message.png";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const contactCards = [
  {
    title: "Phone Number",
    description: "Call us any time",
    detail: "+451 215 215",
    cta: "Call Us",
    icon: phoneIcon,
    variant: "light",
  },
  {
    title: "Office Location",
    description: "Visit our office",
    detail: "Kingston, New York 12401",
    cta: "Get Directions",
    icon: navigateIcon,
    variant: "dark",
  },
  {
    title: "Email Address",
    description: "Send a message",
    detail: "hello@bandage.com",
    cta: "Email Us",
    icon: messageIcon,
    variant: "light",
  },
];

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      <section className="w-full md:min-h-[853px] overflow-visible">
        <div className="w-full max-w-6xl mx-auto px-4 py-10 md:py-16 md:min-h-[853px] overflow-visible">
          <div className="relative flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 md:min-h-[520px]">
            <div className="w-full md:w-1/2 flex flex-col items-start text-left md:pr-6">
              <span className="text-[12px] font-semibold tracking-[1.8px] text-[#252B42]">
                CONTACT US
              </span>
              <h1 className="mt-3 text-[40px] leading-[50px] md:text-[58px] md:leading-[66px] font-bold text-[#252B42]">
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
              <div className="mt-5 flex items-center gap-3 text-[#252B42]">
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end md:absolute md:-right-6 md:top-1/2 md:-translate-y-1/2 overflow-visible">
              <img
                src={contactHero}
                alt="Contact"
                className="w-full max-w-[600px] md:max-w-[1300px] h-auto object-contain md:scale-[1.5] md:origin-right"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-10 md:py-16">
          <div className="text-center">
            <p className="text-[14px] font-semibold text-[#252B42]">
              WE HELP SMALL BUSINESSES
            </p>
            <h2 className="mt-2 text-[24px] md:text-[40px] font-bold text-[#252B42]">
              We help small businesses
              <br className="hidden md:block" />
              with big ideas
            </h2>
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {contactCards.map((card) => {
              const isDark = card.variant === "dark";
              return (
                <div
                  key={card.title}
                  className={`flex flex-col items-center text-center px-6 py-8 rounded-[8px] border ${
                    isDark
                      ? "bg-[#252B42] border-[#252B42] text-white"
                      : "bg-white border-[#E6E6E6] text-[#252B42]"
                  }`}
                >
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="h-12 w-12"
                    loading="lazy"
                  />
                  <h3 className="mt-4 text-[16px] font-semibold">
                    {card.title}
                  </h3>
                  <p
                    className={`mt-2 text-[13px] ${
                      isDark ? "text-white/80" : "text-[#737373]"
                    }`}
                  >
                    {card.description}
                  </p>
                  <p className="mt-3 text-[14px] font-semibold">
                    {card.detail}
                  </p>
                  <button
                    className={`mt-4 h-[40px] px-5 rounded-[5px] text-[12px] font-semibold ${
                      isDark
                        ? "bg-white text-[#252B42]"
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
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
            <img
              src={arrowDownIcon}
              alt="Arrow down"
              className="h-6 w-6"
              loading="lazy"
            />
          </div>
          <p className="text-[14px] font-semibold text-[#252B42]">
            WE CAN&apos;T WAIT TO MEET YOU
          </p>
          <h3 className="mt-2 text-[24px] md:text-[40px] font-bold text-[#252B42]">
            Let&apos;s Talk
          </h3>
          <button className="mt-6 h-[40px] px-6 rounded-[5px] bg-[#23A6F0] text-white text-[12px] font-semibold">
            Try it free now
          </button>
        </div>
      </section>
    </div>
  );
}
