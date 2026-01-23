import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t mt-auto">
      <div className="w-full bg-[#FAFAFA] border-b border-[#E6E6E6]">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-start gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <span className="text-lg font-bold text-[#252B42]">Bandage</span>
          <div className="flex items-center gap-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#23A6F0]">
              <Facebook
                size={18}
                strokeWidth={1.25}
                className="text-white"
                fill="white"
              />
            </span>
            <Instagram size={24} strokeWidth={1.5} className="text-[#23A6F0]" />
            <Twitter
              size={24}
              strokeWidth={1.5}
              className="text-[#23A6F0]"
              fill="#23A6F0"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col gap-8 md:flex-row md:gap-0 md:justify-between">
        <div className="flex flex-col gap-2 w-full md:w-[148px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Company Info</h4>
          <a className="text-[13px] text-[#737373]" href="/">
            About Us
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Carrier
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            We are hiring
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Blog
          </a>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[148px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Legal</h4>
          <a className="text-[13px] text-[#737373]" href="/">
            About Us
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Carrier
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            We are hiring
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Blog
          </a>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[148px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Features</h4>
          <a className="text-[13px] text-[#737373]" href="/">
            Business Marketing
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            User Analytic
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Live Chat
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Unlimited Support
          </a>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[148px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Resources</h4>
          <a className="text-[13px] text-[#737373]" href="/">
            IOS & Android
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Watch a Demo
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            Customers
          </a>
          <a className="text-[13px] text-[#737373]" href="/">
            API
          </a>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[321px]">
          <h4 className="text-[14px] font-bold text-[#252B42]">Get In Touch</h4>
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Your Email"
              className="flex-1 border border-[#E6E6E6] px-4 py-3 text-[13px] rounded-l-md"
            />
            <button className="px-5 py-3 bg-[#23A6F0] text-white text-[13px] rounded-r-md">
              Subscribe
            </button>
          </div>
          <p className="text-[11px] text-[#737373]">
            Lorem ipsum dolor Amit
          </p>
        </div>
      </div>

      <div className="w-full bg-[#FAFAFA]">
        <div className="w-full max-w-6xl mx-auto px-4 py-4 text-xs text-[#737373]">
          Made With Love By Finland All Right Reserved
        </div>
      </div>
    </footer>
  );
}
