import { Switch, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import HomePage from "../pages/HomePage";

const ShopPage = lazy(() => import("../pages/ShopPage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const LoadingFallback = () => (
  <div className="w-full flex items-center justify-center py-16 text-[#737373]">
    Yükleniyor...
  </div>
);

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route
          exact
          path="/product/:id"
          render={(props) => (
            <ProductDetailPage key={props.match.params.id} />
          )}
        />
        <Route
          exact
          path="/product"
          render={() => <ProductDetailPage key="product-default" />}
        />
      </Switch>
    </Suspense>
  );
}
