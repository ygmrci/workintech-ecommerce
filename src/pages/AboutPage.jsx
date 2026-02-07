import { Facebook, Instagram, Twitter } from "lucide-react";
import aboutHero from "../assets/about/none.png";
import videoCover from "../assets/about/video.png";
import pinkWoman from "../assets/about/pink-woman.png";
import jerome from "../assets/team/team-jerome.jpg";
import brooklyn from "../assets/team/team-brooklyn.jpg";
import floyd from "../assets/team/team-floyd.jpg";
import logo1 from "../assets/shop/logos/shop-logo-1.svg";
import logo2 from "../assets/shop/logos/shop-logo-2.svg";
import logo3 from "../assets/shop/logos/shop-logo-3.svg";
import logo4 from "../assets/shop/logos/shop-logo-4.svg";
import logo5 from "../assets/shop/logos/shop-logo-5.svg";
import logo6 from "../assets/shop/logos/shop-logo-6.svg";

const teamMembers = [
  { name: "Username", role: "Profession", image: jerome },
  { name: "Username", role: "Profession", image: brooklyn },
  { name: "Username", role: "Profession", image: floyd },
];

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-0 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <p className="hidden md:block text-[12px] font-semibold tracking-[1.8px] text-[#252B42]">
                ABOUT COMPANY
              </p>
              <h1 className="mt-3 text-[24px] leading-[30px] md:text-[58px] md:leading-[66px] font-bold text-[#252B42]">
                ABOUT US
              </h1>
              <p className="mt-4 text-[14px] leading-[20px] text-[#737373] max-w-[260px] md:max-w-[380px] hidden md:block">
                We know how large objects will act, but things on a small scale.
              </p>
              <p className="mt-4 text-[14px] leading-[20px] text-[#737373] max-w-[260px] md:hidden">
                <span className="block">We know how large</span>
                <span className="block">objects will act, but things</span>
                <span className="block">on a small scale just do</span>
                <span className="block">not act that way.</span>
              </p>
              <button className="mt-6 h-[40px] px-6 rounded-[5px] bg-[#23A6F0] text-white text-[12px] font-semibold mx-auto md:mx-0">
                Get Quote Now
              </button>
            </div>
            <div className="relative flex items-center justify-center mt-6 md:mt-0">
              <div className="absolute h-[200px] w-[200px] md:h-[260px] md:w-[260px] rounded-full bg-[#FFEDEB]" />
              <img
                src={aboutHero}
                alt="About hero"
                className="relative w-full max-w-[260px] md:max-w-[480px] object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-center md:text-left">
            <div className="max-w-[280px] mx-auto md:max-w-none md:mx-0">
              <p className="text-[12px] font-semibold text-[#E74040]">
                Problems trying
              </p>
              <h3 className="mt-3 text-[20px] md:text-[26px] font-semibold text-[#252B42]">
                <span className="block md:hidden">Met minim Mollie non</span>
                <span className="block md:hidden">desert Alamo est sit</span>
                <span className="block md:hidden">cliquey dolor do met</span>
                <span className="block md:hidden">sent.</span>
                <span className="hidden md:block">
                  Met minim Mollie non desert
                </span>
                <span className="hidden md:block">
                  Alamo est sit cliquey dolor do
                </span>
                <span className="hidden md:block">met sent.</span>
              </h3>
            </div>
            <p className="mt-4 text-[14px] leading-[20px] md:leading-[22px] tracking-[0.2px] text-[#737373] max-w-[353px] md:max-w-[640px] mx-auto md:mx-0 text-left">
              <span className="block md:hidden">
                Problems trying to resolve the conflict between the two major
                realms of Classical physics:
              </span>
              <span className="block md:hidden">Newtonian mechanics</span>
              <span className="hidden md:block">
                Problems trying to resolve the conflict between
              </span>
              <span className="hidden md:block">
                the two major realms of Classical physics: Newtonian mechanics
              </span>
            </p>
          </div>

          <div className="mt-12 md:mt-10 grid grid-cols-1 md:grid-cols-4 gap-y-8 md:gap-y-10 gap-x-12 text-center">
            <div>
              <p className="text-[32px] font-bold text-[#252B42]">15K</p>
              <p className="text-[12px] text-[#737373]">Happy Customers</p>
            </div>
            <div>
              <p className="text-[32px] font-bold text-[#252B42]">150K</p>
              <p className="text-[12px] text-[#737373]">Monthly Visitors</p>
            </div>
            <div>
              <p className="text-[32px] font-bold text-[#252B42]">15</p>
              <p className="text-[12px] text-[#737373]">Countries Worldwide</p>
            </div>
            <div>
              <p className="text-[32px] font-bold text-[#252B42]">100+</p>
              <p className="text-[12px] text-[#737373]">Top Partners</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="relative overflow-hidden rounded-[10px] w-[307px] h-[316px] md:w-auto md:h-auto md:max-w-none mx-auto">
            <img
              src={videoCover}
              alt="Video cover"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[48px] w-[48px] md:h-[64px] md:w-[64px] rounded-full bg-[#23A6F0] flex items-center justify-center">
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                  <path
                    d="M2 1.9C2 1.1 2.9 0.6 3.6 1L16.3 10.1C17 10.5 17 11.5 16.3 11.9L3.6 21C2.9 21.4 2 20.9 2 20.1V1.9Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-[24px] leading-[30px] md:text-[32px] md:leading-[38px] font-bold text-[#252B42]">
            <span className="block md:inline">Meet Our</span>
            <span className="block md:inline"> Team</span>
          </h2>
          <p className="mt-2 text-[12px] leading-[16px] md:text-[14px] md:leading-[20px] text-[#737373] max-w-[260px] md:max-w-[520px] mx-auto">
            <span className="block md:inline">Problems trying to resolve</span>
            <span className="block md:inline">
              the conflict between the two major
            </span>
            <span className="block md:inline">
              realms of Classical physics:
            </span>
            <span className="block md:inline">Newtonian mechanics</span>
          </p>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-[270px] h-[270px] md:w-[430px] md:h-[280px] object-contain"
                  loading="lazy"
                />
                <p className="mt-5 text-[14px] font-semibold text-[#252B42]">
                  {member.name}
                </p>
                <p className="mt-2 text-[12px] text-[#737373]">{member.role}</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 items-center justify-center bg-[#335BF5] text-white rounded-none md:rounded-full md:bg-[#23A6F0]">
                    <Facebook size={12} className="fill-current stroke-none" />
                  </span>
                  <Instagram
                    size={14}
                    className="stroke-[#E1306C] text-[#E1306C] md:stroke-[#23A6F0] md:text-[#23A6F0]"
                  />
                  <Twitter
                    size={14}
                    className="text-[#23A6F0] fill-current stroke-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA]">
        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-[40px] leading-[50px] tracking-[0.2px] md:text-[32px] md:leading-[38px] font-bold text-[#252B42]">
            <span className="block md:inline">Big</span>
            <span className="block md:inline"> Companies</span>
            <span className="block md:inline"> Are Here</span>
          </h2>
          <p className="mt-2 text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] max-w-[328px] md:max-w-[520px] mx-auto text-center md:text-center md:tracking-normal">
            <span className="block md:inline">
              Problems trying to resolve the conflict
            </span>
            <span className="block md:inline">
              between the two major realms of Classical
            </span>
            <span className="block md:inline">
              physics: Newtonian mechanics
            </span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 items-center justify-items-center gap-6 mt-16 gap-y-10">
            {logos.map((logo) => (
              <img
                key={logo}
                src={logo}
                alt="Company logo"
                className="h-16 w-auto"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden md:h-[636px]">
            <div className="bg-[#2384D1] text-white px-8 py-10 flex flex-col items-center md:items-start justify-center text-center md:text-left">
              <div className="md:ml-8 text-left md:text-left max-w-[320px] md:max-w-none">
                <p className="text-[12px] font-semibold tracking-[1.6px]">
                  WORK WITH US
                </p>
                <h3 className="mt-3 text-[24px] md:text-[32px] font-bold">
                  Now Let&apos;s grow Yours
                </h3>
                <p className="mt-3 text-[13px] text-white/80">
                  The gradual accumulation of information about atomic and
                  small-scale behavior during the first quarter of the 20th
                </p>
                <button className="mt-6 h-[40px] px-6 rounded-[5px] border border-white text-[12px] font-semibold text-white w-fit">
                  Button
                </button>
              </div>
            </div>
            <div className="hidden md:flex bg-[#F7F7F7] items-center justify-start">
              <img
                src={pinkWoman}
                alt="Work with us"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
