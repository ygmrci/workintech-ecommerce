import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LayoutGrid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { fetchProductsThunk } from "../store/product/productThunks";
import { setFilter, setSort } from "../store/product/productActions";
import category01 from "../assets/shop/categories/shop-category-1.jpg";
import category02 from "../assets/shop/categories/shop-category-2.jpg";
import category03 from "../assets/shop/categories/shop-category-3.jpg";
import category04 from "../assets/shop/categories/shop-category-4.jpg";
import category05 from "../assets/shop/categories/shop-category-5.jpg";
import logo01 from "../assets/shop/logos/shop-logo-1.svg";
import logo02 from "../assets/shop/logos/shop-logo-2.svg";
import logo03 from "../assets/shop/logos/shop-logo-3.svg";
import logo04 from "../assets/shop/logos/shop-logo-4.svg";
import logo05 from "../assets/shop/logos/shop-logo-5.svg";
import logo06 from "../assets/shop/logos/shop-logo-6.svg";

// Default backend page size for products
const PAGE_LIMIT = 25;

const fallbackCategoryImages = [
  category01,
  category02,
  category03,
  category04,
  category05,
];

const logos = [logo01, logo02, logo03, logo04, logo05, logo06];



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

// Map API category titles/codes to display labels (use backend data as-is)
const getCategoryDisplayTitle = (category) => {
  if (!category) return "";
  return (
    category.displayTitle ||
    category.title ||
    category.name ||
    (category.code ? String(category.code) : "")
  );
};

export default function ShopPage() {
  const { gender, categoryName, categoryId } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const fetchState = useSelector((state) => state.product.fetchState);
  const filterState = useSelector((state) => state.product.filter);
  const sortState = useSelector((state) => state.product.sort);
  const allCategories = useSelector((state) => state.product.categories);
  const total = useSelector((state) => state.product.total);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(sortState || "");
  const [filterText, setFilterText] = useState(filterState || "");
  const productsSectionRef = useRef(null);

  // Numeric category id derived from route param (used for backend "category" filter)
  const routeCategoryId = useMemo(
    () => (categoryId ? Number(categoryId) : null),
    [categoryId]
  );

  // Top 5 categories by rating (for hero section cards)
  const topCategories = useMemo(() => {
    const base = (allCategories || []).filter((c) =>
      typeof c.rating === "number" && !Number.isNaN(c.rating)
    );
    if (!base.length) return [];
    return [...base]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);
  }, [allCategories]);

  // Selected category display name (for page title) in English
  const selectedCategoryName = useMemo(() => {
    if (!categoryId || !allCategories || !allCategories.length) return "";
    const match = allCategories.find((c) => String(c.id) === String(categoryId));
    return match ? getCategoryDisplayTitle(match) : "";
  }, [categoryId, allCategories]);

  // When a category card is clicked, navigation updates route; useEffect handles fetching.
  const handleCategoryCardClick = () => {};

 
  // Fetch products based on route categoryId, sort and filter.
  useEffect(() => {
    const sort = sortState || null;
    const filter = filterState || "";
    const offset = (currentPage - 1) * PAGE_LIMIT;

    dispatch(
      fetchProductsThunk({
        limit: PAGE_LIMIT,
        offset,
        category: routeCategoryId,
        filter,
        gender: null,
        sort,
      })
    );
  }, [routeCategoryId, sortState, filterState, currentPage, dispatch]);

  const pageCount = useMemo(() => {
    if (!total || total <= PAGE_LIMIT) return 1;
    return Math.max(1, Math.ceil(total / PAGE_LIMIT));
  }, [total]);

  const filteredProducts = useMemo(() => {
    const base = productList || [];
    const sorted = [...base];
    if (sortBy === "price:asc") {
      sorted.sort(
        (a, b) => (a.discountValue || a.price) - (b.discountValue || b.price)
      );
    } else if (sortBy === "price:desc") {
      sorted.sort(
        (a, b) => (b.discountValue || b.price) - (a.discountValue || a.price)
      );
    } else if (sortBy === "rating:asc") {
      sorted.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    } else if (sortBy === "rating:desc") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return sorted;
  }, [sortBy, productList]);

  // Backend already limits the number of products per page; just use filtered list
  const visibleProducts = filteredProducts;

  const goToPage = (page) => {
    if (page < 1 || page > pageCount) return;
    if (page === currentPage) return;

    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
  };

  const handleFilterClick = () => {
    setCurrentPage(1);
    dispatch(setSort(sortBy || ""));
    dispatch(setFilter(filterText));
  };

  const handleFilterInputChange = (e) => {
    setFilterText(e.target.value);
  };

  // Keep local input in sync when external filterState changes
  useEffect(() => {
    if (filterState !== filterText) setFilterText(filterState || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterState]);

  // Keep local sort select in sync when global sort state changes
  useEffect(() => {
    if (sortState !== sortBy) setSortBy(sortState || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState]);

  return (
    <div className="w-full flex flex-col">
      <section className="w-full bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6">
          <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <h1 className="text-[24px] md:text-[30px] font-bold text-[#252B42]">
              {selectedCategoryName || "Shop"}
            </h1>
            <div className="flex items-center justify-center gap-2 text-sm text-[#737373] md:justify-end">
              <Link to="/" className="text-[#252B42] font-semibold">
                Home
              </Link>
              <span className="text-[#BDBDBD]">{">"}</span>
              <span>Shop</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topCategories.length > 0 ? (
              topCategories.map((category, idx) => {
                const imgSrc =
                  category.img ||
                  fallbackCategoryImages[idx % fallbackCategoryImages.length];
                return (
                  <Link
                    key={category.id}
                    // ✅ IMPORTANT: keep route gender as "e"/"k" to match API and use slug title with id
                    to={`/shop/${category.gender}/${encodeSeg(category.title)}/${category.id}`}
                    onClick={() => handleCategoryCardClick(category)}
                    className="relative w-full max-w-[332px] h-[300px] mx-auto sm:max-w-none sm:h-[210px] md:h-[223px] overflow-hidden rounded-sm group"
                  >
                    <img
                      src={imgSrc}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white gap-1">
                      <h3 className="text-[16px] font-bold tracking-wide">
                        {getCategoryDisplayTitle(category)}
                      </h3>
                      <p className="text-[14px]">
                        Rating:{" "}
                        {category.rating?.toFixed
                          ? category.rating.toFixed(1)
                          : category.rating || "-"}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              fallbackCategoryImages.map((image, idx) => (
                <div
                  key={idx}
                  className="relative w-full max-w-[332px] h-[300px] mx-auto sm:max-w-none sm:h-[210px] md:h-[223px] overflow-hidden rounded-sm animate-pulse bg-gray-200"
                >
                  <img
                    src={image}
                    alt="Category placeholder"
                    className="w-full h-full object-cover opacity-60"
                    loading="lazy"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA] border-y border-[#E6E6E6]">
        <div className="w-full max-w-6xl mx-auto px-4 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-[#737373] text-center md:text-left">
            Showing {total || visibleProducts.length} results
          </p>

          <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
            <div className="flex items-center justify-center gap-3 text-[14px] text-[#737373]">
              <span>Views:</span>
              <button
                type="button"
                className="p-2 border border-[#E6E6E6] rounded"
                aria-label="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                type="button"
                className="p-2 border border-[#E6E6E6] rounded"
                aria-label="List view"
              >
                <List size={16} />
              </button>
            </div>

            <div className="flex w-full max-w-[360px] items-center gap-3">
              <select
                className="h-[50px] px-4 border border-[#E6E6E6] text-[14px] text-[#737373] rounded flex-1"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="">Sort By</option>
                <option value="price:asc">price:asc</option>
                <option value="price:desc">price:desc</option>
                <option value="rating:asc">rating:asc</option>
                <option value="rating:desc">rating:desc</option>
              </select>

              <input
                type="text"
                placeholder="Filter"
                className="h-[50px] px-4 border border-[#E6E6E6] text-[14px] text-[#737373] rounded flex-1"
                value={filterText}
                onChange={handleFilterInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleFilterClick();
                  }
                }}
              />

              <button
                type="button"
                className="h-[50px] w-[90px] text-[14px] rounded bg-[#23A6F0] text-white"
                onClick={handleFilterClick}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div
          ref={productsSectionRef}
          className="w-full max-w-6xl mx-auto px-4 py-12"
        >
          {fetchState === "FETCHING" ? (
            <div className="w-full flex flex-col items-center justify-center gap-3 py-16 text-[#737373]">
              <div className="h-8 w-8 rounded-full border-2 border-[#E6E6E6] border-t-[#23A6F0] animate-spin" />
              <span>Yükleniyor...</span>
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="w-full flex items-center justify-center py-16 text-[#737373]">
              No products found.
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full sm:w-[calc(50%-12px)] md:w-[calc(25%-18px)]"
                >
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    department={product.department}
                    price={product.price}
                    discountPrice={product.discountPrice}
                    colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
                    to={
                      gender && categoryName && categoryId
                        ? `/shop/${gender}/${categoryName}/${categoryId}/${encodeSeg(
                            product.title,
                          )}/${product.id}`
                        : undefined
                    }
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <div className="inline-flex border border-[#BDBDBD] rounded overflow-hidden text-[12px] sm:text-[14px] text-[#23A6F0]">
              <button
                type="button"
                className={`px-3 py-3 sm:px-5 border-r border-[#BDBDBD] ${
                  currentPage === 1 ? "text-[#BDBDBD]" : "text-[#23A6F0]"
                }`}
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              {Array.from({ length: pageCount }, (_, index) => {
                const page = index + 1;
                const isActive = currentPage === page;
                return (
                  <button
                    key={page}
                    type="button"
                    className={`px-3 py-3 sm:px-5 border-r border-[#BDBDBD] ${
                      isActive
                        ? "bg-[#23A6F0] text-white"
                        : "text-[#23A6F0]"
                    }`}
                    onClick={() => goToPage(page)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                type="button"
                className={`px-3 py-3 sm:px-5 ${
                  currentPage === pageCount
                    ? "text-[#BDBDBD]"
                    : "text-[#23A6F0]"
                }`}
                onClick={() => goToPage(Math.min(currentPage + 1, pageCount))}
                disabled={currentPage === pageCount}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA] border-t border-[#E6E6E6]">
        <div className="w-full max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 items-center justify-items-center gap-6">
            {logos.map((logo, index) => (
              <img
                key={`${logo}-${index}`}
                src={logo}
                alt={`Brand logo ${index + 1}`}
                className={`w-auto object-contain ${
                  index === 0 ? "h-10" : index === 5 ? "h-16" : "h-14"
                }`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
