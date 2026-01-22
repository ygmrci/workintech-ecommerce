import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Search,
  ShoppingCart,
  Heart,
  Menu,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="w-full flex flex-col">
      {/* Top Bar */}
      <div className="hidden md:block w-full bg-[#252B42] text-white">
        <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          {/* Left */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>(225) 555-0118</span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <Mail size={14} />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>

          {/* Center */}
          <div className="hidden md:flex text-xs opacity-90">
            Follow Us and get a chance to win 80% off
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline opacity-90">Follow Us :</span>
            <Instagram size={14} />
            <Youtube size={14} />
            <Facebook size={14} />
            <Twitter size={14} />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full border-b bg-white">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          {/* Brand */}
          <Link to="/" className="text-xl font-bold text-[#252B42]">
            Bandage
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#737373]">
            <Link to="/" className="text-[#252B42]">
              Home
            </Link>
            <Link to="/shop" className="hover:text-[#252B42]">
              Shop
            </Link>
            <Link to="/about" className="hover:text-[#252B42]">
              About
            </Link>
            <Link to="/blog" className="hover:text-[#252B42]">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-[#252B42]">
              Contact
            </Link>
            <Link to="/pages" className="hover:text-[#252B42]">
              Pages
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-4 text-sm text-[#23A6F0]">
            <Link to="/login" className="hidden md:flex items-center gap-2">
              <span>Login / Register</span>
            </Link>

            <button className="p-2" aria-label="Search">
              <Search size={18} />
            </button>

            <Link
              to="/cart"
              className="flex items-center gap-1"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              <span className="text-xs">1</span>
            </Link>

            <Link
              to="/favorites"
              className="hidden md:flex items-center gap-1"
              aria-label="Favorites"
            >
              <Heart size={18} />
              <span className="text-xs">1</span>
            </Link>

            <button
              className="p-2 md:hidden"
              aria-label="Menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? (
                <svg
                  width="23"
                  height="14"
                  viewBox="0 0 23 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0" y="0" width="23" height="2" fill="#252B42" />
                  <rect x="6" y="6" width="17" height="2" fill="#252B42" />
                  <rect x="12" y="12" width="11" height="2" fill="#252B42" />
                </svg>
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden w-full border-t">
            <div className="flex flex-col items-center gap-6 py-8 text-[20px] text-[#737373]">
              <Link to="/" className="text-[#737373]">
                Home
              </Link>
              <Link to="/product" className="hover:text-[#252B42]">
                Product
              </Link>
              <Link to="/pricing" className="hover:text-[#252B42]">
                Pricing
              </Link>
              <Link to="/contact" className="hover:text-[#252B42]">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
