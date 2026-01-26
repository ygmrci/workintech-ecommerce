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

const productImages = [
  product01,
  product02,
  product03,
  product04,
  product05,
  product06,
  product07,
  product08,
  product09,
  product10,
  product11,
  product12,
];

const productCategories = [
  "Men",
  "Women",
  "Accessories",
  "Kids",
  "Shoes",
  "Bags",
];

export const products = productImages.map((image, idx) => {
  const basePrice = 16.48 + (idx % 6) * 2.5;
  const discount = idx % 3 === 0 ? basePrice - 10 : basePrice - 2;
  return {
    id: idx + 1,
    title: "Graphic Design",
    department: "English Department",
    category: productCategories[idx % productCategories.length],
    popularity: 100 - idx,
    priceValue: Number(basePrice.toFixed(2)),
    discountValue: Number(discount.toFixed(2)),
    price: `$${basePrice.toFixed(2)}`,
    discountPrice: `$${discount.toFixed(2)}`,
    image,
  };
});
