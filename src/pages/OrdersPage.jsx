import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const formatPrice = (value) => {
  const num = Number(value) || 0;
  return `${num.toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} TL`;
};

const formatDateTime = (value) => {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("tr-TR");
};

export default function OrdersPage() {
  const user = useSelector((state) => state.client.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token") || user?.token;
        if (token) {
          api.defaults.headers.common.Authorization = token;
        }
        const { data } = await api.get("/order");
        const list = Array.isArray(data) ? data : data?.orders || [];
        setOrders(list);
      } catch (err) {
        toast.error("Siparişler alınamadı");
        console.error("Orders fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.token]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10">
        <h1 className="text-[22px] md:text-[26px] font-bold text-[#252B42] mb-4">
          Siparişlerim
        </h1>

        {loading ? (
          <div className="bg-white rounded-md border border-[#E6E6E6] p-6 text-center text-[#737373]">
            Siparişleriniz yükleniyor...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-md border border-[#E6E6E6] p-6 text-center text-[#737373]">
            Henüz herhangi bir siparişiniz bulunmuyor.
          </div>
        ) : (
          <div className="bg-white rounded-md border border-[#E6E6E6] divide-y divide-[#F2F2F2]">
            <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-3 text-[13px] text-[#737373] bg-[#F9FAFB]">
              <div className="col-span-3">Sipariş</div>
              <div className="col-span-3">Tarih</div>
              <div className="col-span-2">Tutar</div>
              <div className="col-span-2">Ürün Adedi</div>
              <div className="col-span-2 text-right">Durum</div>
            </div>

            {orders.map((order, index) => {
              const id = order.id ?? order.order_id ?? index;
              const products = Array.isArray(order.products)
                ? order.products
                : [];
              const totalItems = products.reduce(
                (sum, p) => sum + (p.count || 0),
                0,
              );

              const isExpanded = expandedId === id;

              return (
                <div key={id} className="border-t border-[#F2F2F2] first:border-t-0">
                  <button
                    type="button"
                    onClick={() => toggleExpand(id)}
                    className="w-full px-4 py-3 flex flex-col md:grid md:grid-cols-12 md:items-center gap-2 text-left hover:bg-[#FFF8F2] transition-colors"
                  >
                    <div className="flex items-center justify-between md:col-span-3">
                      <div className="text-[13px] font-semibold text-[#252B42]">
                        Sipariş #{id}
                      </div>
                      <div className="md:hidden text-[12px] text-[#737373]">
                        {formatDateTime(order.order_date)}
                      </div>
                    </div>

                    <div className="hidden md:block col-span-3 text-[13px] text-[#737373]">
                      {formatDateTime(order.order_date)}
                    </div>

                    <div className="md:col-span-2 text-[13px] text-[#252B42] font-semibold">
                      {formatPrice(order.price)}
                    </div>

                    <div className="md:col-span-2 text-[13px] text-[#737373]">
                      {totalItems} ürün
                    </div>

                    <div className="md:col-span-2 text-[12px] md:text-right text-[#23A6F0]">
                      {order.status || "Tamamlandı"}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <div className="mt-2 rounded-md border border-[#E6E6E6] overflow-hidden">
                        <div className="px-3 py-2 bg-[#F9FAFB] text-[13px] text-[#737373] font-semibold">
                          Sipariş Detayları
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-[12px]">
                            <thead className="bg-white border-b border-[#F2F2F2] text-[#737373]">
                              <tr>
                                <th className="text-left px-3 py-2 font-semibold">Ürün ID</th>
                                <th className="text-left px-3 py-2 font-semibold">Açıklama</th>
                                <th className="text-left px-3 py-2 font-semibold">Adet</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products.map((p, idx) => (
                                <tr
                                  key={idx}
                                  className="border-b last:border-b-0 border-[#F2F2F2] text-[#252B42]"
                                >
                                  <td className="px-3 py-2">{p.product_id}</td>
                                  <td className="px-3 py-2 text-[#737373]">
                                    {p.detail || "-"}
                                  </td>
                                  <td className="px-3 py-2">{p.count}</td>
                                </tr>
                              ))}
                              {products.length === 0 && (
                                <tr>
                                  <td
                                    colSpan={3}
                                    className="px-3 py-3 text-center text-[#737373]"
                                  >
                                    Bu sipariş için ürün bilgisi bulunamadı.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
