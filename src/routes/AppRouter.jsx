import { Switch, Route, Redirect } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import CreateOrderPage from "../pages/CreateOrderPage";

const ShopPage = lazy(() => import("../pages/ShopPage"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetailPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const TeamPage = lazy(() => import("../pages/TeamPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const OrdersPage = lazy(() => import("../pages/OrdersPage"));
const LoadingFallback = () => (
  <div className="w-full flex items-center justify-center py-16 text-[#737373]">
    Yükleniyor...
  </div>
);

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  const user = useSelector((state) => state.client.user);
  const isAuthenticated = Boolean(user && user.token);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route
          exact
          path="/shop/:gender/:categoryName/:categoryId"
          component={ShopPage}
        />
        <Route
          exact
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          component={ProductDetailPage}
        />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/team" component={TeamPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route
          exact
          path="/product/:id"
          render={(props) => <ProductDetailPage key={props.match.params.id} />}
        />
        <Route
          exact
          path="/product"
          render={() => <ProductDetailPage key="product-default" />}
        />
        <Route exact path="/cart" component={CartPage} />
        <PrivateRoute exact path="/order" component={CreateOrderPage} />
        <PrivateRoute exact path="/orders" component={OrdersPage} />
      </Switch>
    </Suspense>
  );
}
