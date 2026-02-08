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
import { products } from "../data/products";
import logo01 from "../assets/shop/logos/shop-logo-1.svg";
import logo02 from "../assets/shop/logos/shop-logo-2.svg";
import logo03 from "../assets/shop/logos/shop-logo-3.svg";
import logo04 from "../assets/shop/logos/shop-logo-4.svg";
import logo05 from "../assets/shop/logos/shop-logo-5.svg";
import logo06 from "../assets/shop/logos/shop-logo-6.svg";

const categories = [
  { id: 1, title: "CLOTHS", items: "5 Items", image: category01 },
  { id: 2, title: "CLOTHS", items: "5 Items", image: category02 },
  { id: 3, title: "CLOTHS", items: "5 Items", image: category03 },
  { id: 4, title: "CLOTHS", items: "5 Items", image: category04 },
  { id: 5, title: "CLOTHS", items: "5 Items", image: category05 },
];

const logos = [logo01, logo02, logo03, logo04, logo05, logo06];

export default function ShopPage() {
  const { gender, categoryName, categoryId } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const fetchState = useSelector((state) => state.product.fetchState);
  const filterState = useSelector((state) => state.product.filter);
  const sortState = useSelector((state) => state.product.sort);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(sortState || "popularity");
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const loadingTimerRef = useRef(null);
  const productsSectionRef = useRef(null);

  // Fetch products when category/filter/sort/gender change
  useEffect(() => {
    const category = categoryId || null;
    const sort = sortState || null;
    const filter = filterState || null;
    const genderParam = gender || null;
    dispatch(fetchProductsThunk({ limit: 25, offset: 0, filter, category, sort, gender: genderParam }));
  }, [gender, categoryId, filterState, sortState, dispatch]);

  const pageSizes = isMobile ? [4, 4, 4] : [12, 12, 8];
  const pageCount = pageSizes.length;
  const perPage = pageSizes[currentPage - 1];

  useEffect(() => {
    const handleResize = () => {
      const nextIsMobile = window.innerWidth < 640;
      setIsMobile((prev) => {
        if (prev !== nextIsMobile) {
          setCurrentPage(1);
        }
        return nextIsMobile;
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = useMemo(() => {
    const base = productList && productList.length > 0 ? productList : products;
    const filtered = showDiscountedOnly
      ? base.filter(
          (p) =>
            (p.discountValue || p.discount) &&
            (p.discountValue || p.discount) < (p.priceValue || p.price),
        )
      : base;
    const sorted = [...filtered];
    if (sortBy === "price-asc") {
      sorted.sort(
        (a, b) => (a.discountValue || a.price) - (b.discountValue || b.price),
      );
    } else if (sortBy === "price-desc") {
      sorted.sort(
        (a, b) => (b.discountValue || b.price) - (a.discountValue || a.price),
      );
    }
    return sorted;
  }, [sortBy, showDiscountedOnly, productList]);

  const pagedSource = useMemo(
    () => filteredProducts.slice(0, 12),
    [filteredProducts],
  );
  const pageStartIndex = pageSizes
    .slice(0, currentPage - 1)
    .reduce((a, b) => a + b, 0);
  const visibleProducts = useMemo(() => {
    if (isMobile) {
      return pagedSource.slice(pageStartIndex, pageStartIndex + perPage);
    }
    return pagedSource.slice(0, perPage);
  }, [isMobile, pagedSource, pageStartIndex, perPage]);

  const goToPage = (page, force = false) => {
    if (!force && page === currentPage) return;
    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
    }
    setIsLoading(true);
    loadingTimerRef.current = setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
      loadingTimerRef.current = null;
    }, 350);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    dispatch(setSort(value));
    goToPage(1, true);
  };

  const handleFilterClick = () => {
    setShowDiscountedOnly((prev) => !prev);
    goToPage(1, true);
  };

  const handleFilterInputChange = (e) => {
    const v = e.target.value;
    dispatch(setFilter(v));
    goToPage(1, true);
  };

  return (
    <div className="w-full flex flex-col">
      <section className="w-full bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6">
          <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <h1 className="text-[24px] md:text-[30px] font-bold text-[#252B42]">
              {categoryName ? `${categoryName}` : "Shop"}
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
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative w-full max-w-[332px] h-[300px] mx-auto sm:max-w-none sm:h-[210px] md:h-[223px] overflow-hidden rounded-sm"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-white gap-1">
                  <h3 className="text-[16px] font-bold tracking-wide">
                    {category.title}
                  </h3>
                  <p className="text-[14px]">{category.items}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#FAFAFA] border-y border-[#E6E6E6]">
        <div className="w-full max-w-6xl mx-auto px-4 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-[#737373] text-center md:text-left">
            Showing all {pagedSource.length} results
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
                value={filterState || ""}
                onChange={handleFilterInputChange}
              />

              <button
                type="button"
                className={`h-[50px] w-[90px] text-[14px] rounded ${
                  showDiscountedOnly
                    ? "bg-[#252B42] text-white"
                    : "bg-[#23A6F0] text-white"
                }`}
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
          {(isLoading || fetchState === "FETCHING") ? (
            <div className="w-full flex items-center justify-center py-16 text-[#737373]">
              Yükleniyor...
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
              <button
                type="button"
                className={`px-3 py-3 sm:px-5 border-r border-[#BDBDBD] ${
                  currentPage === 1
                    ? "bg-[#23A6F0] text-white"
                    : "text-[#23A6F0]"
                }`}
                onClick={() => goToPage(1)}
                aria-current={currentPage === 1 ? "page" : undefined}
              >
                1
              </button>
              <button
                type="button"
                className={`px-3 py-3 sm:px-5 border-r border-[#BDBDBD] ${
                  currentPage === 2
                    ? "bg-[#23A6F0] text-white"
                    : "text-[#23A6F0]"
                }`}
                onClick={() => goToPage(2)}
                aria-current={currentPage === 2 ? "page" : undefined}
              >
                2
              </button>
              <button
                type="button"
                className={`px-3 py-3 sm:px-5 border-r border-[#BDBDBD] ${
                  currentPage === 3
                    ? "bg-[#23A6F0] text-white"
                    : "text-[#23A6F0]"
                }`}
                onClick={() => goToPage(3)}
                aria-current={currentPage === 3 ? "page" : undefined}
              >
                3
              </button>
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
