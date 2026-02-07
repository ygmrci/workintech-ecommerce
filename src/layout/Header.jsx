import { useState, useMemo, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import md5 from "blueimp-md5";
import api from "../api/axiosInstance";
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
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const categoriesRef = useRef(null);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);
  const userEmail = user?.email || "";
  const isLoggedIn = Boolean(userEmail);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setIsCategoriesOpen(false);
      }
    };

    if (isCategoriesOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCategoriesOpen]);

  const avatarUrl = useMemo(() => {
    if (!userEmail) return "";

    const email = userEmail.trim().toLowerCase();
    const hash = md5(email);
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=80`;
  }, [userEmail]);

  const isContactHeader = location.pathname === "/contact";

  const getContactNavClass = (path) =>
    `hover:text-[#252B42] ${
      location.pathname === path ? "text-[#252B42] font-semibold" : ""
    }`;

  const loginTo = {
    pathname: "/login",
    state: { from: location },
  };

  const signupTo = {
    pathname: "/signup",
    state: { from: location },
  };

  if (isContactHeader) {
    return (
      <header className="w-full bg-white relative z-20">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-[#252B42]">
            Bandage
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#737373]">
            <NavLink exact to="/" className={getContactNavClass("/")}>
              Home
            </NavLink>
            <NavLink to="/shop" className={getContactNavClass("/shop")}>
              Product
            </NavLink>
            <NavLink to="/pages" className={getContactNavClass("/pages")}>
              Pricing
            </NavLink>
            <NavLink to="/contact" className={getContactNavClass("/contact")}>
              Contact
            </NavLink>
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-4 md:hidden text-[#252B42]">
              <button className="p-1" aria-label="Search">
                <Search size={18} />
              </button>
              <Link to="/cart" className="p-1" aria-label="Cart">
                <ShoppingCart size={18} />
              </Link>
              <button
                className="p-1"
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
                  <Menu size={22} />
                )}
              </button>
            </div>

            {!isLoggedIn ? (
              <>
                <Link to={loginTo} className="hidden md:flex text-[#23A6F0]">
                  Login
                </Link>

                {/* Register / Sign up */}
                <Link
                  to={signupTo}
                  className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-[5px] bg-[#23A6F0] text-white text-[12px] font-semibold"
                >
                  Become a member
                  <ArrowRight size={14} />
                </Link>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2 text-[#252B42]">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-semibold">{user?.name}</span>
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden w-full border-t bg-[#F6F6F6]">
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
                Product
              </NavLink>
              <NavLink
                to="/pages"
                className="hover:text-[#252B42]"
                activeClassName="text-[#252B42] font-semibold"
              >
                Pricing
              </NavLink>
              <NavLink
                to="/contact"
                className="hover:text-[#252B42]"
                activeClassName="text-[#252B42] font-semibold"
              >
                Contact
              </NavLink>

              {!isLoggedIn ? (
                <div className="flex flex-col items-center gap-3">
                  <Link
                    to={loginTo}
                    className="flex items-center gap-2 text-[#23A6F0] font-semibold"
                  >
                    <User size={20} />
                    <span className="text-[16px]">Login</span>
                  </Link>

                  <Link
                    to={signupTo}
                    className="flex items-center gap-2 text-[#23A6F0] font-semibold"
                  >
                    <User size={20} />
                    <span className="text-[16px]">Register</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#252B42]">
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-[16px] font-semibold">
                    {user?.name}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="w-full flex flex-col">
      {/* Top Bar */}
      <div className="hidden md:block w-full bg-[#252B42] text-white">
        <div className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-2">
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

          <div className="hidden md:flex text-xs opacity-90">
            Follow Us and get a chance to win 80% off
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:inline opacity-90">Follow Us :</span>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={14} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
              <Youtube size={14} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <Facebook size={14} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <Twitter size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full bg-white overflow-visible">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 py-3 md:py-4 overflow-visible">
          <Link to="/" className="text-xl font-bold text-[#252B42]">
            Bandage
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-[#737373] relative overflow-visible">
            <NavLink
              exact
              to="/"
              className="hover:text-[#252B42]"
              activeClassName="text-[#252B42] font-semibold"
            >
              Home
            </NavLink>
            <div className="relative" ref={categoriesRef}>
              <button
                className="flex items-center gap-1 hover:text-[#252B42] text-[#737373]"
                onClick={() => setIsCategoriesOpen((prev) => !prev)}
              >
                <span>Shop</span>
                <ChevronDown
                  size={14}
                  className={`text-[#737373] transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Categories Dropdown */}
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-2xl z-[9999] max-h-96 overflow-y-auto py-2 min-h-[100px]">
                  {categories && categories.length > 0 ? (
                    <>
                      {/* Simple list without grouping */}
                      {categories.map((category) => (
                        <Link
                          key={`${category.id}`}
                          to={`/shop/${category.gender || "kadin"}/${category.title}/${category.id}`}
                          onClick={() => setIsCategoriesOpen(false)}
                          className="block px-4 py-2 text-[#252B42] hover:bg-[#F3F3F3] text-sm hover:text-[#23A6F0]"
                        >
                          {category.title}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-2 text-[#737373] text-sm">
                      Kategoriler yükleniyor...
                    </div>
                  )}
                </div>
              )}
            </div>
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
              to="/team"
              className="hover:text-[#252B42]"
              activeClassName="text-[#252B42] font-semibold"
            >
              Team
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

          <div className="flex items-center gap-2 sm:gap-4 text-sm text-[#23A6F0]">
            {!isLoggedIn ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to={loginTo} className="flex items-center gap-2">
                  <span>Login</span>
                </Link>
                <Link to={signupTo} className="flex items-center gap-2">
                  <span>Register</span>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2 text-[#252B42]">
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-semibold">{user?.name}</span>
                <button
                  onClick={() => {
                    dispatch({ type: "client/SET_USER", payload: {} });
                    localStorage.removeItem("token");
                    delete api.defaults.headers.common.Authorization;
                    history.push("/");
                  }}
                  className="text-sm text-[#23A6F0] ml-2"
                >
                  Logout
                </button>
              </div>
            )}

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

              {/* Mobile Shop Dropdown */}
              <div className="w-full">
                <button
                  onClick={() => setIsCategoriesOpen((prev) => !prev)}
                  className="flex items-center justify-center gap-1 w-full hover:text-[#252B42] text-[#737373]"
                >
                  <span>Shop</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#737373] transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isCategoriesOpen && (
                  <div className="mt-4 flex flex-col items-center gap-2 border-t pt-4">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/shop/${category.gender}/${category.title}/${category.id}`}
                          className="text-[16px] text-[#252B42] hover:text-[#23A6F0]"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsCategoriesOpen(false);
                          }}
                        >
                          {category.title}
                        </Link>
                      ))
                    ) : (
                      <div className="text-[#737373] text-[16px]">
                        No categories available
                      </div>
                    )}
                  </div>
                )}
              </div>

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
                to="/team"
                className="hover:text-[#252B42]"
                activeClassName="text-[#252B42] font-semibold"
              >
                Team
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

              {!isLoggedIn ? (
                <div className="flex flex-col items-center gap-3 text-[#23A6F0] font-semibold">
                  <Link to={loginTo} className="flex items-center gap-2">
                    <User size={20} />
                    <span className="text-[16px]">Login</span>
                  </Link>
                  <Link to={signupTo} className="flex items-center gap-2">
                    <User size={20} />
                    <span className="text-[16px]">Register</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#252B42]">
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-[16px] font-semibold">
                    {user?.name}
                  </span>
                </div>
              )}

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
