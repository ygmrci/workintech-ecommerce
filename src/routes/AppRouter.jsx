import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
}
