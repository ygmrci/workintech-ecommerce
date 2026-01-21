import { Link } from "react-router-dom";

export default function ProductCard({
  image,
  title,
  department,
  price,
  discountPrice,
  colors = [],
}) {
  return (
    <div className="w-full flex flex-col">
      <Link to="/product" className="w-full overflow-hidden bg-white">
        <img
          src={image}
          alt={title}
          className="w-full h-[280px] md:h-[300px] object-contain object-top"
          loading="lazy"
        />
      </Link>

      <div className="w-full flex flex-col items-center text-center gap-2 py-4">
        <h4 className="text-sm font-bold text-[#252B42]">{title}</h4>
        <p className="text-xs text-[#737373]">{department}</p>
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

