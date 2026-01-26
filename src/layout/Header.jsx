import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
  User,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false);
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
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <Youtube size={14} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook size={14} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <Twitter size={14} />
            </a>
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
            <NavLink
              exact
              to="/"
              className="hover:text-[#252B42]"
              activeClassName="text-[#252B42] font-semibold"
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className="hover:text-[#252B42]"
              activeClassName="text-[#252B42] font-semibold"
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-[#252B42]"
              activeClassName="text-[#252B42] font-semibold"
            >
              About
            </NavLink>
            <NavLink
              to="/blog"
              className="hover:text-[#252B42]"
              activeClassName="text-[#252B42] font-semibold"
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-[#252B42]"
              activeClassName="text-[#252B42] font-semibold"
            >
              Contact
            </NavLink>
            <NavLink
              to="/pages"
              className="hover:text-[#252B42]"
              activeClassName="text-[#252B42] font-semibold"
            >
              Pages
            </NavLink>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-4 text-sm text-[#23A6F0]">
            <Link to="/login" className="hidden md:flex items-center gap-2">
              <span>Login / Register</span>
            </Link>

            <button
              className="hidden md:inline-flex p-2"
              aria-label="Search"
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              <Search size={18} />
            </button>

            {isSearchOpen && (
              <input
                type="text"
                placeholder="Ürün ara..."
                className="hidden md:inline-flex h-[36px] w-[200px] border border-[#E6E6E6] px-3 text-[13px] rounded transition-all duration-200 ease-in-out"
              />
            )}

            <Link
              to="/cart"
              className="hidden md:flex items-center gap-1"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
            </Link>

            <Link
              to="/favorites"
              className="hidden md:flex items-center gap-1"
              aria-label="Favorites"
            >
              <Heart size={18} />
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
              <NavLink
                exact
                to="/"
                className="hover:text-[#252B42]"
                activeClassName="text-[#252B42] font-semibold"
              >
                Home
              </NavLink>
              <NavLink
                to="/shop"
                className="hover:text-[#252B42]"
                activeClassName="text-[#252B42] font-semibold"
              >
                Shop
              </NavLink>
              <NavLink
                to="/about"
                className="hover:text-[#252B42]"
                activeClassName="text-[#252B42] font-semibold"
              >
                About
              </NavLink>
              <NavLink
                to="/blog"
                className="hover:text-[#252B42]"
                activeClassName="text-[#252B42] font-semibold"
              >
                Blog
              </NavLink>
              <NavLink
                to="/contact"
                className="hover:text-[#252B42]"
                activeClassName="text-[#252B42] font-semibold"
              >
                Contact
              </NavLink>
              <NavLink
                to="/pages"
                className="hover:text-[#252B42]"
                activeClassName="text-[#252B42] font-semibold"
              >
                Pages
              </NavLink>
              <Link
                to="/login"
                className="flex items-center gap-2 text-[#23A6F0] font-semibold"
              >
                <User size={20} />
                <span className="text-[16px]">Login / Register</span>
              </Link>
              <div className="flex flex-col items-center gap-4 text-[#23A6F0] font-semibold">
                <button
                  className="p-1"
                  aria-label="Search"
                  onClick={() => setIsSearchOpen((prev) => !prev)}
                >
                  <Search size={22} strokeWidth={2} />
                </button>
                {isSearchOpen && (
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    className="h-[40px] w-[220px] border border-[#E6E6E6] px-3 text-[13px] rounded transition-all duration-200 ease-in-out"
                  />
                )}
                <Link
                  to="/cart"
                  className="flex items-center gap-1"
                  aria-label="Cart"
                >
                  <ShoppingCart size={22} strokeWidth={2} />
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center gap-1"
                  aria-label="Favorites"
                >
                  <Heart size={22} strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
