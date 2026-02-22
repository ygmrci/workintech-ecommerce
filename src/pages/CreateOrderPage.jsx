import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchAddressesThunk,
  addAddressThunk,
  updateAddressThunk,
  deleteAddressThunk,
} from "../store/client/clientThunks";
import {
  fetchCardsThunk,
  addCardThunk,
  updateCardThunk,
  deleteCardThunk,
} from "../store/client/clientThunks";
import { createOrderThunk } from "../store/cart/cartThunks";

const CITY_OPTIONS = [
  "Adana",
  "Ankara",
  "Antalya",
  "Bursa",
  "Gaziantep",
  "İstanbul",
  "İzmir",
  "Kayseri",
  "Kocaeli",
  "Konya",
];

const formatPrice = (value) => {
  const num = Number(value) || 0;
  return `${num.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} TL`;
};

function AddressCard({
  address,
  selected,
  onSelect,
  onEdit,
  onDelete,
}) {
  const fullName = `${address.name || ""} ${address.surname || ""}`.trim();

  return (
    <div
      className={`flex items-start justify-between gap-3 border rounded-md px-3 py-3 text-[13px] cursor-pointer transition-colors ${selected ? "border-[#F27A1A] bg-[#FFF8F2]" : "border-[#E6E6E6] bg-white"}`}
      onClick={onSelect}
    >
      <div className="flex items-start gap-2 flex-1">
        <input
          type="radio"
          className="mt-1 h-4 w-4 text-[#F27A1A] border-[#CCCCCC]"
          checked={selected}
          onChange={onSelect}
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[12px] px-2 py-[2px] rounded border border-[#F27A1A] text-[#F27A1A] font-semibold">
              {address.title || "Adres"}
            </span>
          </div>
          {fullName && (
            <div className="text-[#252B42] font-semibold">{fullName}</div>
          )}
          {address.phone && (
            <div className="text-[#737373] text-[12px]">{address.phone}</div>
          )}
          <div className="text-[#737373] text-[12px] leading-snug">
            {[address.neighborhood, address.district, address.city]
              .filter(Boolean)
              .join(" / ")}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 text-[12px] text-[#23A6F0]">
        <button type="button" onClick={onEdit} className="hover:underline">
          Düzenle
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-[#F44336] hover:underline"
        >
          Sil
        </button>
      </div>
    </div>
  );
}

function AddressForm({
  initialValues,
  onCancel,
  onSubmit,
}) {
  const [form, setForm] = useState({
    title: initialValues?.title || "",
    name: initialValues?.name || "",
    surname: initialValues?.surname || "",
    phone: initialValues?.phone || "",
    city: initialValues?.city || "",
    district: initialValues?.district || "",
    neighborhood: initialValues?.neighborhood || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 border border-[#E6E6E6] rounded-md p-4 bg-[#FDFDFD] space-y-3"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1 text-[13px]">
          <label className="text-[#252B42] font-semibold">Adres Başlığı</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
          />
        </div>
        <div className="flex flex-col gap-1 text-[13px]">
          <label className="text-[#252B42] font-semibold">Ad</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
          />
        </div>
        <div className="flex flex-col gap-1 text-[13px]">
          <label className="text-[#252B42] font-semibold">Soyad</label>
          <input
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleChange}
            required
            className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
          />
        </div>
        <div className="flex flex-col gap-1 text-[13px]">
          <label className="text-[#252B42] font-semibold">Telefon</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
          />
        </div>
        <div className="flex flex-col gap-1 text-[13px]">
          <label className="text-[#252B42] font-semibold">İl</label>
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
          >
            <option value="">Şehir seçiniz</option>
            {CITY_OPTIONS.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 text-[13px]">
          <label className="text-[#252B42] font-semibold">İlçe</label>
          <input
            type="text"
            name="district"
            value={form.district}
            onChange={handleChange}
            required
            className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 text-[13px]">
        <label className="text-[#252B42] font-semibold">
          Mahalle / Adres Detayı
        </label>
        <textarea
          name="neighborhood"
          value={form.neighborhood}
          onChange={handleChange}
          required
          rows={3}
          className="px-3 py-2 border border-[#E6E6E6] rounded-md text-[13px] resize-y focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="h-9 px-4 rounded-md border border-[#E6E6E6] text-[13px] text-[#737373] hover:bg-[#F5F5F5]"
        >
          Vazgeç
        </button>
        <button
          type="submit"
          className="h-9 px-5 rounded-md bg-[#F27A1A] text-white text-[13px] font-semibold hover:bg-[#e0660c]"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}

export default function CreateOrderPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shoppingCart.cart || []);
  const addresses = useSelector((state) => state.client.addressList || []);
  const cards = useSelector((state) => state.client.creditCards || []);

  const [shippingAddressId, setShippingAddressId] = useState(null);
  const [billingAddressId, setBillingAddressId] = useState(null);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: Address, 2: Payment

  // payment state
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isNewCardMode, setIsNewCardMode] = useState(false);
  const [cardForm, setCardForm] = useState({
    id: null,
    card_no: "",
    expire_month: "",
    expire_year: "",
    name_on_card: "",
    cvv: "",
    secure3d: false,
  });
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchAddressesThunk());
    dispatch(fetchCardsThunk());
  }, [dispatch]);

  const SHIPPING_FEE = 29.99;
  const FREE_SHIPPING_THRESHOLD = 150;

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
  }, [productsTotal]);

  const shippingDiscount = useMemo(() => {
    if (productsTotal >= FREE_SHIPPING_THRESHOLD) return SHIPPING_FEE;
    return 0;
  }, [productsTotal]);

  const grandTotal = useMemo(() => {
    return productsTotal + shippingPrice - shippingDiscount;
  }, [productsTotal, shippingPrice, shippingDiscount]);

  const handleSubmitAddress = (formValues) => {
    if (editingAddress && editingAddress.id) {
      const payload = { ...formValues, id: editingAddress.id };
      dispatch(updateAddressThunk(payload));
    } else {
      dispatch(addAddressThunk(formValues));
    }
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (address) => {
    if (!address || !address.id) return;
    dispatch(deleteAddressThunk(address.id));
  };

  const handleCardSelect = (card) => {
    setSelectedCardId(card.id);
    setIsNewCardMode(false);
    setCardForm((prev) => ({
      ...prev,
      id: card.id,
      card_no: card.card_no || "",
      expire_month: card.expire_month || "",
      expire_year: card.expire_year || "",
      name_on_card: card.name_on_card || "",
      cvv: "",
    }));
  };

  const handleCardFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCardFormSubmit = (e) => {
    e.preventDefault();
    const payload = {
      id: cardForm.id,
      card_no: cardForm.card_no,
      expire_month: Number(cardForm.expire_month),
      expire_year: Number(cardForm.expire_year),
      name_on_card: cardForm.name_on_card,
    };

    if (payload.id) {
      dispatch(updateCardThunk(payload));
    } else {
      dispatch(
        addCardThunk({
          card_no: payload.card_no,
          expire_month: payload.expire_month,
          expire_year: payload.expire_year,
          name_on_card: payload.name_on_card,
        }),
      );
    }

    setIsNewCardMode(false);
    setCardForm((prev) => ({ ...prev, id: null, cvv: "" }));
  };

  const handleDeleteCard = (cardId) => {
    if (!cardId) return;
    dispatch(deleteCardThunk(cardId));
    if (selectedCardId === cardId) {
      setSelectedCardId(null);
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddressId) {
      toast.error("Lütfen bir teslimat adresi seçin.");
      setActiveStep(1);
      return;
    }

    if (
      !cardForm.card_no ||
      !cardForm.expire_month ||
      !cardForm.expire_year ||
      !cardForm.name_on_card ||
      !cardForm.cvv
    ) {
      toast.error("Lütfen kart bilgilerini eksiksiz doldurun.");
      setActiveStep(2);
      return;
    }

    const selectedProducts = (cartItems || []).filter((item) => item.checked);
    const itemsForOrder = selectedProducts.length > 0 ? selectedProducts : cartItems;

    if (!itemsForOrder || itemsForOrder.length === 0) {
      toast.error("Sepetinizde sipariş verilecek ürün bulunmuyor.");
      return;
    }

    const products = itemsForOrder.map((item) => {
      const p = item.product || {};
      const id = p.id ?? p._id;
      const size = item.size ?? p.size ?? p.beden ?? null;
      const color = p.color || p.renk || p.colorName || null;

      let detail = "";
      if (color && size) detail = `${color} - ${size}`;
      else if (size) detail = String(size);
      else if (color) detail = String(color);

      return {
        product_id: id,
        count: item.count || 0,
        detail,
      };
    });

    const orderPayload = {
      address_id: shippingAddressId,
      order_date: new Date().toISOString(),
      card_no: Number(cardForm.card_no),
      card_name: cardForm.name_on_card,
      card_expire_month: Number(cardForm.expire_month),
      card_expire_year: Number(cardForm.expire_year),
      card_ccv: Number(cardForm.cvv),
      price: grandTotal,
      products,
    };

    try {
      await dispatch(createOrderThunk(orderPayload));
      setOrderCompleted(true);
      setActiveStep(1);
      setShippingAddressId(null);
      setBillingAddressId(null);
      setSelectedCardId(null);
      setIsNewCardMode(false);
      setCardForm({
        id: null,
        card_no: "",
        expire_month: "",
        expire_year: "",
        name_on_card: "",
        cvv: "",
        secure3d: false,
      });
    } catch {
      // error toast already shown in thunk
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-8 flex flex-col lg:flex-row gap-6 items-start justify-between">
        {orderCompleted && (
          <div className="w-full mb-4 bg-white border border-[#E6E6E6] rounded-md px-4 py-4 text-[14px] text-[#252B42] font-semibold">
            Siparişiniz başarıyla oluşturuldu. Teşekkür ederiz!
          </div>
        )}
        <div className="flex-1 w-full space-y-4">
          <div className="grid grid-cols-2 border border-[#E6E6E6] rounded-md overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className={`px-4 py-3 border-r border-[#E6E6E6] text-[14px] font-bold text-left ${activeStep === 1 ? "bg-[#FFF8F2] text-[#F27A1A]" : "bg-white text-[#B0B0B0]"}`}
            >
              1. Adres Bilgileri
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className={`px-4 py-3 text-[14px] font-semibold text-left ${activeStep === 2 ? "bg-[#FFF8F2] text-[#F27A1A]" : "bg-white text-[#B0B0B0]"}`}
            >
              2. Ödeme Seçenekleri
            </button>
          </div>

          {activeStep === 1 && (
            <div className="bg-white border border-[#E6E6E6] rounded-md p-4 md:p-5 space-y-4">
            <div className="text-[16px] font-bold text-[#252B42]">
              Teslimat Adresi
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <button
                type="button"
                onClick={() => {
                  setEditingAddress(null);
                  setIsFormOpen(true);
                }}
                className="flex flex-col items-center justify-center border border-dashed border-[#CCCCCC] rounded-md h-[120px] text-[#F27A1A] text-[13px] font-semibold bg-[#FFFBF7] hover:bg-[#FFF3E6]"
              >
                <span className="text-2xl mb-1">+</span>
                Yeni Adres Ekle
              </button>

              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  selected={shippingAddressId === address.id}
                  onSelect={() => setShippingAddressId(address.id)}
                  onEdit={(e) => {
                    e.stopPropagation();
                    setEditingAddress(address);
                    setIsFormOpen(true);
                  }}
                  onDelete={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(address);
                  }}
                />
              ))}
            </div>

            {isFormOpen && (
              <AddressForm
                initialValues={editingAddress}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingAddress(null);
                }}
                onSubmit={handleSubmitAddress}
              />
            )}

            <div className="pt-4 border-t border-[#F2F2F2] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#252B42]">
                  Fatura Adresi
                </span>
                <label className="flex items-center gap-2 text-[13px] text-[#737373]">
                  <input
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                  />
                  Faturamı aynı adrese gönder
                </label>
              </div>

              {!billingSameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                  {addresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      selected={billingAddressId === address.id}
                      onSelect={() => setBillingAddressId(address.id)}
                      onEdit={(e) => {
                        e.stopPropagation();
                        setEditingAddress(address);
                        setIsFormOpen(true);
                      }}
                      onDelete={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(address);
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-1 text-[12px] text-[#737373] bg-[#FFF8F2] border border-[#FFE0C2] rounded-md px-3 py-3">
                <span>
                  Kurumsal faturalı alışveriş yapmak için "Faturamı Aynı Adrese Gönder"
                  tikini kaldırın ve fatura adresi olarak kayıtlı kurumsal fatura
                  adresinizi seçin.
                </span>
              </div>
            </div>
          </div>
          )}

          {activeStep === 2 && (
            <div className="bg-white border border-[#E6E6E6] rounded-md p-4 md:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[16px] font-bold text-[#252B42]">
                    Kart ile Öde
                  </span>
                  <span className="text-[13px] text-[#737373]">
                    Kart ile ödemeyi seçtiniz. Banka veya kredi kartı kullanarak
                    ödemenizi güvenle yapabilirsiniz.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-[12px] text-[#23A6F0] underline"
                >
                  Adres Bilgilerini Değiştir
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-[#252B42]">
                      Kart Bilgileri
                    </span>
                    {cards.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsNewCardMode(true);
                          setCardForm({
                            id: null,
                            card_no: "",
                            expire_month: "",
                            expire_year: "",
                            name_on_card: "",
                            cvv: "",
                            secure3d: false,
                          });
                        }}
                        className="text-[12px] text-[#23A6F0] underline"
                      >
                        Başka bir kart ile ödeme yap
                      </button>
                    )}
                  </div>

                  {cards.length > 0 && !isNewCardMode && (
                    <div className="space-y-2">
                      {cards.map((card) => {
                        const masked = card.card_no
                          ? `${card.card_no.slice(0, 4)} ${card.card_no
                              .slice(-4)
                              .padStart(card.card_no.length, "*")}`
                          : "";
                        return (
                          <div
                            key={card.id}
                            className={`flex items-center justify-between border rounded-md px-3 py-3 text-[13px] cursor-pointer ${selectedCardId === card.id ? "border-[#F27A1A] bg-[#FFF8F2]" : "border-[#E6E6E6] bg-white"}`}
                            onClick={() => handleCardSelect(card)}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                checked={selectedCardId === card.id}
                                onChange={() => handleCardSelect(card)}
                              />
                              <div className="flex flex-col">
                                <span className="font-semibold text-[#252B42]">
                                  {card.name_on_card}
                                </span>
                                <span className="text-[#737373] text-[12px]">
                                  {masked}
                                </span>
                                <span className="text-[#999999] text-[11px]">
                                  {card.expire_month}/{card.expire_year}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCard(card.id);
                              }}
                              className="text-[12px] text-[#F44336] underline"
                            >
                              Sil
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {(cards.length === 0 || isNewCardMode) && (
                    <form
                      onSubmit={handleCardFormSubmit}
                      className="mt-2 space-y-3 border border-[#E6E6E6] rounded-md p-4 bg-[#FDFDFD]"
                    >
                      <div className="flex flex-col gap-1 text-[13px]">
                        <label className="text-[#252B42] font-semibold">
                          Kart Numarası
                        </label>
                        <input
                          type="text"
                          name="card_no"
                          value={cardForm.card_no}
                          onChange={handleCardFormChange}
                          required
                          className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-[13px]">
                        <div className="flex flex-col gap-1">
                          <label className="text-[#252B42] font-semibold">
                            Son Kullanma Tarihi
                          </label>
                          <div className="flex gap-2">
                            <select
                              name="expire_month"
                              value={cardForm.expire_month}
                              onChange={handleCardFormChange}
                              required
                              className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-[#F27A1A] w-1/2"
                            >
                              <option value="">Ay</option>
                              {Array.from({ length: 12 }).map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                            <select
                              name="expire_year"
                              value={cardForm.expire_year}
                              onChange={handleCardFormChange}
                              required
                              className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-[#F27A1A] w-1/2"
                            >
                              <option value="">Yıl</option>
                              {Array.from({ length: 12 }).map((_, i) => {
                                const year = new Date().getFullYear() + i;
                                return (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[#252B42] font-semibold">
                            CVV
                          </label>
                          <input
                            type="password"
                            name="cvv"
                            value={cardForm.cvv}
                            onChange={handleCardFormChange}
                            required
                            className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 text-[13px]">
                        <label className="text-[#252B42] font-semibold">
                          Kart Üzerindeki İsim
                        </label>
                        <input
                          type="text"
                          name="name_on_card"
                          value={cardForm.name_on_card}
                          onChange={handleCardFormChange}
                          required
                          className="h-9 px-3 border border-[#E6E6E6] rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F27A1A]"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-[13px] text-[#252B42]">
                        <input
                          type="checkbox"
                          name="secure3d"
                          checked={cardForm.secure3d}
                          onChange={handleCardFormChange}
                        />
                        <span>
                          <span className="font-bold">3D Secure</span> ile ödemek
                          istiyorum
                        </span>
                      </label>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        {cards.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setIsNewCardMode(false)}
                            className="h-9 px-4 rounded-md border border-[#E6E6E6] text-[13px] text-[#737373] hover:bg-[#F5F5F5]"
                          >
                            Vazgeç
                          </button>
                        )}
                        <button
                          type="submit"
                          className="h-9 px-5 rounded-md bg-[#F27A1A] text-white text-[13px] font-semibold hover:bg-[#e0660c]"
                        >
                          Kaydet
                        </button>
                      </div>
                    </form>
                  )}

                  {cards.length > 0 && !isNewCardMode && (
                    <label className="mt-3 flex items-center gap-2 text-[13px] text-[#252B42]">
                      <input
                        type="checkbox"
                        name="secure3d"
                        checked={cardForm.secure3d}
                        onChange={handleCardFormChange}
                      />
                      <span>
                        <span className="font-bold">3D Secure</span> ile ödemek
                        istiyorum
                      </span>
                    </label>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="text-[14px] font-bold text-[#252B42]">
                    Taksit Seçenekleri
                  </div>
                  <div className="border border-[#E6E6E6] rounded-md overflow-hidden text-[13px] text-[#252B42]">
                    <div className="flex items-center justify-between px-3 py-2 bg-[#F9FAFB] text-[#737373]">
                      <span>Taksit Sayısı</span>
                      <span>Aylık Ödeme</span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border border-[#F27A1A] bg-[#F27A1A]" />
                        <span>Tek Çekim</span>
                      </div>
                      <span className="font-semibold text-[#252B42]">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-4">
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full h-[56px] rounded-md bg-[#F27A1A] hover:bg-[#e0660c] text-white text-sm md:text-base font-semibold flex items-center justify-center transition-colors shadow-sm"
          >
            Ödeme Yap
          </button>

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
        </div>
      </div>
    </div>
  );
}
