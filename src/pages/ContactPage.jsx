import contactImage from "../assets/contact/contact.jpg";

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      <section className="w-full bg-[#2A7CC7] md:h-[634px]">
        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-0 md:h-full">
          <div className="relative flex flex-col md:flex-row items-center md:items-stretch md:h-full">
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left py-10 md:py-0 md:pr-10 md:justify-center">
              <p className="text-[12px] tracking-[1.8px] font-semibold text-white/80">
                WORK WITH US
              </p>
              <h1 className="mt-3 text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] font-bold text-white max-w-[240px] md:max-w-none">
                <span className="md:hidden">
                  Now Let&apos;s
                  <br />
                  grow Yours
                </span>
                <span className="hidden md:inline">Now Let&apos;s grow Yours</span>
              </h1>
              <p className="mt-3 text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] text-white/90 max-w-[240px] md:max-w-none">
                <span className="md:hidden">
                  The gradual accumulation of
                  <br />
                  information about atomic and
                  <br />
                  small-scale behaviour during the
                  <br />
                  first quarter of the 20th
                </span>
                <span className="hidden md:inline">
                  The gradual accumulation of information about atomic and
                  <br />
                  small-scale behaviour during the first quarter of the 20th
                </span>
              </p>
              <button className="mt-6 h-[40px] px-8 border border-white text-white text-[12px] font-semibold rounded-[5px]">
                Button
              </button>
            </div>
            <div className="hidden md:block w-full md:w-1/2">
              <img
                src={contactImage}
                alt="Work with us"
                className="w-full h-[220px] md:w-[590px] md:h-[634px] object-cover md:absolute md:right-[-142px] md:top-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
