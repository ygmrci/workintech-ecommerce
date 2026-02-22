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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const categoriesRef = useRef(null);
  const cartRef = useRef(null);
  const userMenuRef = useRef(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);
  const cartItems = useSelector((state) => state.shoppingCart.cart);
  const userEmail = user?.email || "";
  const isLoggedIn = Boolean(userEmail);

  const cartItemCount = useMemo(
    () =>
      (cartItems || []).reduce(
        (sum, item) => sum + (typeof item.count === "number" ? item.count : 0),
        0,
      ),
    [cartItems],
  );

  const getCartPriceText = (product) => {
    if (!product) return "";

    const numeric =
      typeof product.discountValue === "number"
        ? product.discountValue
        : typeof product.priceValue === "number"
          ? product.priceValue
          : null;

    if (numeric != null) {
      return `${numeric.toLocaleString("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} TL`;
    }

    if (typeof product.discountPrice === "string") return product.discountPrice;
    if (typeof product.price === "string") return product.price;

    return "";
  };

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

  // Close cart dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCartOpen]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const avatarUrl = useMemo(() => {
    if (!userEmail) return "";

    const email = userEmail.trim().toLowerCase();
    const hash = md5(email);
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=80`;
  }, [userEmail]);

  // Normalize gender segment for routes (API & ShopPage use "k" / "e")
  const normalizeGender = (g) => {
    if (!g) return "other";
    const gLower = String(g).toLowerCase().trim();
    if (gLower === "k" || gLower.includes("kadin") || gLower.includes("kadın") || gLower.includes("kadi"))
      return "k";
    if (gLower === "e" || gLower.includes("erkek") || gLower.includes("erk")) return "e";
    return gLower.replace(/\s+/g, "-");
  };

  // Slugify category titles like "Ayakkabı" -> "ayakkabi"
  const encodeSeg = (s) => {
    if (!s) return "";
    const map = {
      ç: "c",
      ğ: "g",
      ı: "i",
      ö: "o",
      ş: "s",
      ü: "u",
      Ç: "c",
      Ğ: "g",
      I: "i",
      İ: "i",
      Ö: "o",
      Ş: "s",
      Ü: "u",
    };
    return String(s)
      .split("")
      .map((ch) => map[ch] || ch)
      .join("")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Display category title exactly as it comes from backend (or fallback fields)
  const getCategoryDisplayTitle = (category) => {
    if (!category) return "";
    return (
      category.displayTitle ||
      category.title ||
      category.name ||
      (category.code ? String(category.code) : "")
    );
  };

  // Helpers to detect genders in multiple language/format variants (including API values)
  const isKadin = (g) => {
    if (!g) return false;
    const s = String(g).toLowerCase();
    if (s === "k") return true;
    return /kadi|kadın|kadin|female|woman|women|fem/.test(s);
  };

  const isErkek = (g) => {
    if (!g) return false;
    const s = String(g).toLowerCase();
    if (s === "e") return true;
    return /erkek|erk|male|man|men/.test(s);
  };

  // Filtered category lists for dropdown columns (all categories, ordered by rating)
  const kadinCategories = useMemo(() => {
    const list = (categories || []).filter((c) => isKadin(c.gender));
    return [...list]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [categories]);

  const erkekCategories = useMemo(() => {
    const list = (categories || []).filter((c) => isErkek(c.gender));
    return [...list]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [categories]);

  // Debug: log categories when dropdown opens
  useEffect(() => {
    // Intentionally left empty: removed debug logs in production code
  }, [isCategoriesOpen, categories, kadinCategories, erkekCategories]);

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

  const handleLogout = () => {
    dispatch({ type: "client/SET_USER", payload: {} });
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
    history.push("/");
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
              <div
                className="hidden md:flex items-center gap-2 text-[#252B42] relative"
                ref={userMenuRef}
              >
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-semibold">{user?.name}</span>
                  <ChevronDown size={14} className="text-[#737373]" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#E6E6E6] rounded-md shadow-md text-[13px] text-[#252B42] z-[9999]">
                    <Link
                      to="/orders"
                      className="block px-3 py-2 hover:bg-[#F5F5F5]"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Siparişlerim
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-[#F5F5F5] text-[#F44336]"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
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
  <div
    className="
      absolute top-full left-0
      mt-2 w-[420px] max-w-[calc(100vw-32px)]
      z-[9999]
    "
  >
    {/* Outer shell */}
    <div className="relative rounded-md bg-white shadow-lg border border-gray-200 overflow-hidden min-h-[240px]">
      {/* (removed left cyan stripe) */}

      {/* Content area */}
      <div className="relative px-12 py-16">
        <div className="grid grid-cols-2 gap-16 items-start">
          {/* Kadın */}
          <div>
            <div className="font-bold text-[#252B42] text-xs mb-6">
              Kadın
            </div>

            <div className="flex flex-col gap-4 min-h-[120px]">
              {(() => {
                const left = kadinCategories.length
                  ? kadinCategories
                  : categories.slice(0, Math.ceil((categories || []).length / 2));

                return left.length > 0 ? (
                  left.map((category) => (
                    <Link
                      key={category.id}
                      to={`/shop/${normalizeGender(category.gender)}/${encodeSeg(category.title)}/${category.id}`}
                      onClick={() => setIsCategoriesOpen(false)}
                      className="block hover:text-[#23A6F0] text-xs leading-5 py-2 text-[#737373]"
                    >
                      {getCategoryDisplayTitle(category)}
                    </Link>
                  ))
                ) : (
                  <div className="text-[#737373] text-xs">No categories</div>
                );
              })()}
            </div>
          </div>

          {/* Erkek */}
          <div>
            <div className="font-bold text-[#252B42] text-xs mb-6">
              Erkek
            </div>

            <div className="flex flex-col gap-4 min-h-[120px]">
              {(() => {
                const right = erkekCategories.length
                  ? erkekCategories
                  : categories.slice(Math.ceil((categories || []).length / 2));

                return right.length > 0 ? (
                  right.map((category) => (
                    <Link
                      key={category.id}
                      to={`/shop/${normalizeGender(category.gender)}/${encodeSeg(category.title)}/${category.id}`}
                      onClick={() => setIsCategoriesOpen(false)}
                      className="block hover:text-[#23A6F0] text-xs leading-5 py-2 text-[#737373]"
                    >
                      {getCategoryDisplayTitle(category)}
                    </Link>
                  ))
                ) : (
                  <div className="text-[#737373] text-xs">No categories</div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
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
              <div
                className="hidden md:flex items-center gap-2 text-[#252B42] relative"
                ref={userMenuRef}
              >
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-semibold">{user?.name}</span>
                  <ChevronDown size={14} className="text-[#737373]" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#E6E6E6] rounded-md shadow-md text-[13px] text-[#252B42] z-[9999]">
                    <Link
                      to="/orders"
                      className="block px-3 py-2 hover:bg-[#F5F5F5]"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Siparişlerim
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-[#F5F5F5] text-[#F44336]"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                )}
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

            {/* Cart dropdown (desktop) */}
            <div className="hidden md:flex items-center relative" ref={cartRef}>
              <button
                type="button"
                className="inline-flex items-center gap-1 p-2 relative"
                aria-label="Cart"
                onClick={() => setIsCartOpen((prev) => !prev)}
              >
                <ShoppingCart size={18} />
                {cartItemCount > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[#FF6A00] text-[11px] font-semibold text-white">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {isCartOpen && (
                <div className="absolute right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-32px)] bg-white border border-[#E6E6E6] rounded-[8px] shadow-lg z-[9999]">
                  {cartItems && cartItems.length > 0 ? (
                    <>
                      {/* Header */}
                      <div className="px-4 pt-4 pb-2 border-b border-[#F2F2F2] flex items-baseline justify-between">
                        <p className="text-[14px] font-semibold text-[#252B42]">
                          Sepetim ({cartItemCount} Ürün)
                        </p>
                      </div>

                      {/* Items */}
                      <div className="max-h-72 overflow-y-auto">
                        {cartItems.map((item, index) => {
                          const p = item.product || {};
                          const key = p.id || p._id || index;
                          const title = p.title || p.name || "Ürün";
                          const description =
                            p.shortDescription ||
                            p.description ||
                            p.department ||
                            "";
                          const sizeText =
                            item.size || p.size || p.beden || "";
                          const count = item.count || 0;
                          const priceText = getCartPriceText(p);

                          return (
                            <div
                              key={key}
                              className="flex gap-3 px-4 py-3 border-b border-[#F2F2F2] last:border-b-0"
                            >
                              {p.image && (
                                <img
                                  src={p.image}
                                  alt={title}
                                  className="h-[64px] w-[64px] object-contain rounded-[4px] border border-[#E6E6E6] bg-white"
                                  loading="lazy"
                                />
                              )}
                              <div className="flex-1 flex flex-col justify-between text-[12px]">
                                <div className="flex flex-col gap-0.5">
                                  <span className="font-semibold text-[#252B42] line-clamp-2">
                                    {title}
                                  </span>
                                  {description && (
                                    <span className="text-[#737373] text-[11px] line-clamp-2">
                                      {description}
                                    </span>
                                  )}
                                  <span className="text-[11px] text-[#B0B0B0] mt-1">
                                    {sizeText && <>Beden: {sizeText} &nbsp; · &nbsp;</>}
                                    Adet: {count}
                                  </span>
                                </div>
                                {priceText && (
                                  <span className="mt-1 text-[13px] font-semibold text-[#F27A1A]">
                                    {priceText}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer buttons */}
                      <div className="px-4 py-3 border-t border-[#F2F2F2] flex gap-3">
                        <Link
                          to="/cart"
                          className="flex-1 h-[40px] flex items-center justify-center rounded-[4px] border border-[#E6E6E6] text-[13px] text-[#333333] bg-white hover:bg-[#F5F5F5] transition-colors"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Sepete Git
                        </Link>
                        <button
                          type="button"
                          className="flex-1 h-[40px] flex items-center justify-center rounded-[4px] bg-[#F27A1A] text-[13px] font-semibold text-white hover:bg-[#e46d0f] transition-colors"
                        >
                          Siparişi Tamamla
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-4 text-sm text-[#737373] text-center">
                      Sepetiniz boş.
                    </div>
                  )}
                </div>
              )}
            </div>

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
                          to={`/shop/${normalizeGender(category.gender)}/${encodeSeg(category.title)}/${category.id}`}
                          className="text-[16px] text-[#252B42] hover:text-[#23A6F0]"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsCategoriesOpen(false);
                          }}
                        >
                          {getCategoryDisplayTitle(category)}
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
