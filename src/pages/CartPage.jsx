import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, CheckSquare, Square } from "lucide-react";
import {
  updateCartCount,
  removeFromCart,
  toggleCartItem,
  toggleAllCartItems,
} from "../store/cart/cartActions";

const formatPrice = (value) => {
  const num = Number(value) || 0;
  return `${num.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} TL`;
};

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingCart.cart || []);

  const SHIPPING_FEE = 29.99;
  const FREE_SHIPPING_THRESHOLD = 150;

  const totalCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.count || 0), 0),
    [cartItems],
  );

  const allChecked = useMemo(
    () => cartItems.length > 0 && cartItems.every((item) => item.checked),
    [cartItems],
  );

  const productsTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const p = item.product || {};
      const unit =
        typeof p.discountValue === "number"
          ? p.discountValue
          : typeof p.priceValue === "number"
          ? p.priceValue
          : 0;
      return sum + unit * (item.count || 0);
    }, 0);
  }, [cartItems]);

  const shippingPrice = useMemo(() => {
    if (productsTotal <= 0) return 0;
    return SHIPPING_FEE;
  }, [productsTotal, SHIPPING_FEE]);

  const shippingDiscount = useMemo(() => {
    if (productsTotal >= FREE_SHIPPING_THRESHOLD) return SHIPPING_FEE;
    return 0;
  }, [productsTotal, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE]);

  const grandTotal = useMemo(() => {
    return productsTotal + shippingPrice - shippingDiscount;
  }, [productsTotal, shippingPrice, shippingDiscount]);

  const totalAmount = useMemo(() => {
    return cartItems
      .filter((item) => item.checked)
      .reduce((sum, item) => {
        const p = item.product || {};
        const unit =
          typeof p.discountValue === "number"
            ? p.discountValue
            : typeof p.priceValue === "number"
            ? p.priceValue
            : 0;
        return sum + unit * (item.count || 0);
      }, 0);
  }, [cartItems]);

  const handleToggleAll = () => {
    dispatch(toggleAllCartItems(!allChecked));
  };

  const handleToggleItem = (item) => {
    const p = item.product || {};
    const id = p.id ?? p._id;
    const size = item.size ?? p.size ?? p.beden ?? null;
    dispatch(toggleCartItem(id, size));
  };

  const handleChangeCount = (item, delta) => {
    const p = item.product || {};
    const id = p.id ?? p._id;
    const size = item.size ?? p.size ?? p.beden ?? null;
    dispatch(updateCartCount(id, size, delta));
  };

  const handleRemove = (item) => {
    const p = item.product || {};
    const id = p.id ?? p._id;
    const size = item.size ?? p.size ?? p.beden ?? null;
    dispatch(removeFromCart(id, size));
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
        <h1 className="text-[22px] md:text-[26px] font-bold text-[#252B42] mb-4">
          Sepetim ({totalCount} ürün)
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-md border border-[#E6E6E6] p-8 text-center text-[#737373]">
            <p className="mb-4">Sepetinizde henüz ürün yok.</p>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center h-[40px] px-6 rounded-md bg-[#23A6F0] text-white text-sm font-semibold"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
            {/* Cart items area - left column */}
            <div className="bg-white rounded-md border border-[#E6E6E6] overflow-hidden w-full lg:flex-1">
              {/* Header row */}
              <div className="flex items-center px-4 py-3 border-b border-[#F2F2F2] bg-[#F9FAFB] text-[13px] text-[#737373]">
                <button
                  type="button"
                  onClick={handleToggleAll}
                  className="mr-3 text-[#23A6F0] flex items-center justify-center"
                  aria-label="Tümünü seç/bırak"
                >
                  {allChecked ? <CheckSquare size={18} /> : <Square size={18} />}
                </button>
                <span className="w-full md:w-[45%] font-semibold text-[#252B42]">
                  Ürün
                </span>
                <span className="hidden md:block w-[15%] text-right">
                  Birim Fiyat
                </span>
                <span className="hidden md:block w-[20%] text-center">Adet</span>
                <span className="hidden md:block w-[15%] text-right mr-6">
                  Toplam
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-[#F2F2F2]">
                {cartItems.map((item, index) => {
                  const p = item.product || {};
                  const title = p.title || p.name || "Ürün";
                  const image = p.image;
                  const size = item.size ?? p.size ?? p.beden ?? null;
                  const unit =
                    typeof p.discountValue === "number"
                      ? p.discountValue
                      : typeof p.priceValue === "number"
                      ? p.priceValue
                      : 0;
                  const lineTotal = unit * (item.count || 0);

                  return (
                    <div
                      key={p.id ?? p._id ?? index}
                      className="flex flex-col md:flex-row items-stretch md:items-center px-4 py-3 gap-3 md:gap-4"
                    >
                      <div className="flex items-start gap-3 md:w-[45%] w-full">
                        <button
                          type="button"
                          onClick={() => handleToggleItem(item)}
                          className="mt-2 text-[#23A6F0] flex-shrink-0"
                          aria-label="Seç/bırak"
                        >
                          {item.checked ? (
                            <CheckSquare size={18} />
                          ) : (
                            <Square size={18} />
                          )}
                        </button>
                        {image && (
                          <img
                            src={image}
                            alt={title}
                            className="h-[72px] w-[72px] object-contain rounded border border-[#E6E6E6] bg-white flex-shrink-0"
                            loading="lazy"
                          />
                        )}
                        <div className="flex flex-col gap-1 text-[13px] text-[#737373] flex-1">
                          <span className="font-semibold text-[#252B42] line-clamp-2">
                            {title}
                          </span>
                          {size && (
                            <span className="text-[12px] text-[#777777]">
                              Beden: {size}
                            </span>
                          )}
                          <span className="text-[12px] text-[#999999]">
                            Adet: {item.count || 0}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemove(item)}
                            className="mt-1 inline-flex items-center gap-1 text-[12px] text-[#F44336] hover:text-[#d32f2f]"
                          >
                            <Trash2 size={14} /> Kaldır
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-row md:flex-row items-center justify-between md:justify-end gap-3 text-[13px]">
                        <div className="hidden md:block w-[15%] text-right text-[#252B42] font-semibold">
                          {formatPrice(unit)}
                        </div>

                        <div className="md:w-[20%] flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleChangeCount(item, -1)}
                            className="h-8 w-8 flex items-center justify-center border border-[#E6E6E6] rounded text-[#555555]"
                            aria-label="Azalt"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-[32px] text-center text-[#252B42] font-semibold">
                            {item.count || 0}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleChangeCount(item, 1)}
                            className="h-8 w-8 flex items-center justify-center border border-[#E6E6E6] rounded text-[#555555]"
                            aria-label="Artır"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="md:w-[15%] text-right text-[#252B42] font-semibold">
                          {formatPrice(lineTotal)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer total */}
              <div className="px-4 py-4 border-t border-[#F2F2F2] flex flex-col md:flex-row items-center justify-between gap-3 bg-[#FDFDFD]">
                <span className="text-[13px] text-[#737373]">
                  Seçili ürünler için ödenecek tutar:
                </span>
                <span className="text-[18px] font-bold text-[#F27A1A]">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            {/* Order summary column - right column */}
            <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-4">
              {/* Top confirm button */}
              <Link
                to="/order"
                className="w-full h-[56px] rounded-md bg-[#F27A1A] hover:bg-[#e0660c] text-white text-sm md:text-base font-semibold flex items-center justify-center transition-colors shadow-sm"
              >
                Sepeti Onayla
              </Link>

              {/* Summary box */}
              <div className="bg-white rounded-md border border-[#E6E6E6] p-4 md:p-6">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#252B42] mb-4">
                  Sipariş Özeti
                </h2>

                <div className="space-y-2 text-[14px] text-[#737373] mb-3">
                  <div className="flex items-center justify-between">
                    <span>Ürünün Toplamı</span>
                    <span className="font-semibold text-[#252B42]">
                      {formatPrice(productsTotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Kargo Toplam</span>
                    <span className="font-semibold text-[#252B42]">
                      {formatPrice(shippingPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span>150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
                    <span className="font-semibold text-[#F27A1A]">
                      -{formatPrice(shippingDiscount)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#E6E6E6] pt-3 mt-2 flex items-center justify-between text-[15px]">
                  <span className="text-[#252B42] font-semibold">Toplam</span>
                  <span className="text-[#F27A1A] font-bold text-[18px]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Coupon box */}
              <button
                type="button"
                className="w-full h-[56px] rounded-md border border-[#E6E6E6] bg-white text-[#252B42] text-sm md:text-base font-semibold flex items-center justify-center gap-2 hover:bg-[#F9FAFB] transition-colors"
              >
                <span className="text-[#F27A1A] text-lg leading-none">+</span>
                <span>İndirim Kodu Gir</span>
              </button>

              {/* Bottom confirm button */}
              <Link
                to="/order"
                className="w-full h-[56px] rounded-md bg-[#F27A1A] hover:bg-[#e0660c] text-white text-sm md:text-base font-semibold flex items-center justify-center transition-colors shadow-sm"
              >
                Sepeti Onayla
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
