import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";
import ProductCard from "../components/ProductCard";
import category01 from "../assets/shop/categories/shop-category-1.jpg";
import category02 from "../assets/shop/categories/shop-category-2.jpg";
import category03 from "../assets/shop/categories/shop-category-3.jpg";
import category04 from "../assets/shop/categories/shop-category-4.jpg";
import category05 from "../assets/shop/categories/shop-category-5.jpg";
import product01 from "../assets/shop/products/shop-product-01.jpg";
import product02 from "../assets/shop/products/shop-product-02.jpg";
import product03 from "../assets/shop/products/shop-product-03.jpg";
import product04 from "../assets/shop/products/shop-product-04.jpg";
import product05 from "../assets/shop/products/shop-product-05.jpg";
import product06 from "../assets/shop/products/shop-product-06.jpg";
import product07 from "../assets/shop/products/shop-product-07.jpg";
import product08 from "../assets/shop/products/shop-product-08.jpg";
import product09 from "../assets/shop/products/shop-product-09.jpg";
import product10 from "../assets/shop/products/shop-product-10.jpg";
import product11 from "../assets/shop/products/shop-product-11.jpg";
import product12 from "../assets/shop/products/shop-product-12.jpg";
import logo01 from "../assets/shop/logos/shop-logo-1.png";
import logo02 from "../assets/shop/logos/shop-logo-2.png";
import logo03 from "../assets/shop/logos/shop-logo-3.png";
import logo04 from "../assets/shop/logos/shop-logo-4.png";
import logo05 from "../assets/shop/logos/shop-logo-5.png";
import logo06 from "../assets/shop/logos/shop-logo-6.png";

const categories = [
  { id: 1, title: "CLOTHS", items: "5 Items", image: category01 },
  { id: 2, title: "CLOTHS", items: "5 Items", image: category02 },
  { id: 3, title: "CLOTHS", items: "5 Items", image: category03 },
  { id: 4, title: "CLOTHS", items: "5 Items", image: category04 },
  { id: 5, title: "CLOTHS", items: "5 Items", image: category05 },
];

const products = [
  {
    id: 1,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product01,
  },
  {
    id: 2,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product02,
  },
  {
    id: 3,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product03,
  },
  {
    id: 4,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product04,
  },
  {
    id: 5,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product05,
  },
  {
    id: 6,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product06,
  },
  {
    id: 7,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product07,
  },
  {
    id: 8,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product08,
  },
  {
    id: 9,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product09,
  },
  {
    id: 10,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product10,
  },
  {
    id: 11,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product11,
  },
  {
    id: 12,
    title: "Graphic Design",
    department: "English Department",
    price: "$16.48",
    discountPrice: "$6.48",
    image: product12,
  },
];

const logos = [logo01, logo02, logo03, logo04, logo05, logo06];

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const loadingTimerRef = useRef(null);
  const pageSizes = [12, 12, 8];
  const pageCount = pageSizes.length;
  const perPage = pageSizes[currentPage - 1];

  const visibleProducts = useMemo(
    () => products.slice(0, perPage),
    [perPage]
  );

  const goToPage = (page) => {
    if (page === currentPage) return;
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

  return (
    <div className="w-full flex flex-col">
      <section className="w-full bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6">
          <div className="flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <h1 className="text-[24px] md:text-[30px] font-bold text-[#252B42]">
              Shop
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
            Showing all {products.length} results
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

            <div className="flex w-full max-w-[252px] items-center gap-3">
              <select className="h-[50px] flex-1 px-5 border border-[#E6E6E6] text-[14px] text-[#737373] rounded">
                <option>Popularity</option>
              </select>
              <button
                type="button"
                className="h-[50px] w-[90px] bg-[#23A6F0] text-white text-[14px] rounded"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
          {isLoading ? (
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
