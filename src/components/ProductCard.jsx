import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  image,
  title,
  department,
  price,
  discountPrice,
  colors = [],
}) {
  const productLink = id ? `/product/${id}` : "/product/1";
  return (
    <div className="w-full flex flex-col items-center">
      <Link
        to={productLink}
        className="w-full overflow-hidden bg-white max-w-[360px] h-[427px]"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain object-center"
          loading="lazy"
        />
      </Link>

      <div className="w-full max-w-[300px] flex flex-col items-center text-center gap-[10px] py-4">
        <h4 className="text-[16px] font-bold text-[#252B42]">{title}</h4>
        <p className="text-[14px] text-[#737373]">{department}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#BDBDBD] line-through">{price}</span>
          <span className="text-[#23856D] font-bold">{discountPrice}</span>
        </div>
        <div className="flex items-center gap-2">
          {colors.map((c) => (
            <span
              key={c}
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

