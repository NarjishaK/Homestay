import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from "react-router-dom";
import HomeV4 from "./components/home";

import About from "./components/about";
import Service from "./components/service";
import ServiceDetails from "./components/service-details";
import Portfolio from "./components/portfolio";
import PortfolioV2 from "./components/portfolio-v2";
import PortfolioDetails from "./components/portfolio-details";
import Team from "./components/team";
import TeamDetails from "./components/team-details";
import Faq from "./components/faq";
import ComingSoon from "./components/coming-soon";
import Error from "./components/404";
import Location from "./components/location";

import Shop from "./components/shop";
import Homestays from "./components/AllHomestays";
import ProdductDetails from "./components/product-details";
import ShopLeftSidebar from "./components/shop-left-sidebar";
import ShopRightSidebar from "./components/shop-right-sidebar";

import BlogGrid from "./components/blog-grid";
import BlogLeftSidebar from "./components/blog-left-sidebar";
import BlogRightSidebar from "./components/blog-right-sidebar";
import Blog from "./components/blog";

import BlogDetails from "./components/blog-details";
import Contact from "./components/contact";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import MyAccount from "./components/my-account";
import Login from "./components/Users/login";
import Register from "./components/Users/register";
import AddListing from "./components/add-listing";
import Wishlist from "./components/wishlist";
import OrderTracking from "./components/order-tracking";
import History from "./components/history";

import Place from "./components/Admins/place";
import PlaceEdit from "./components/Admins/place-edit";
import PlaceCreate from "./components/Admins/place-create";
import Categorycreate from "./components/Admins/categorycreate";
import CategoryList from "./components/Admins/categorylist";
import Categoryedit from "./components/Admins/categoryedit";
import AdminAccount from "./components/Admins/admin-account";
import DestinationList from "./components/Admins/destinationlist";
import Destinationedit from "./components/Admins/destinationedit";
//
import UserLists from "./components/Admins/userlist"
import UserProfile from "./components/Users/userprofile";
class Root extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div>
          <Switch>
            <Route exact path="/" component={HomeV4} />
            <Route path="/adminpanellist" component={Place} />
            <Route path="/adminpaneledit/:id" component={PlaceEdit} />
            <Route path="/addplace" component={PlaceCreate} />
            <Route path="/categorycreate" component={Categorycreate} />
            <Route path="/categorylist" component={CategoryList} />
            <Route path="/categoryedit/:id" component={Categoryedit} />
            <Route path="/destinationlist" component={DestinationList} />
            <Route path="/destinationedit/:id" component={Destinationedit} />
            <Route path="/admins" component={AdminAccount} />
            {/* // */}
            <Route path="/userlists" component={UserLists}/>
            <Route path="/userprofile/:id" component={UserProfile}/>

            <Route path="/about/:id" component={About} />
            <Route path="/service" component={Service} />
            <Route path="/service-details" component={ServiceDetails} />
            <Route path="/portfolio/:id" component={Portfolio} />
            <Route path="/portfolio-v2" component={PortfolioV2} />
            <Route path="/portfolio-details" component={PortfolioDetails} />
            <Route path="/team" component={Team} />
            <Route path="/team-details" component={TeamDetails} />
            <Route path="/faq" component={Faq} />
            <Route path="/coming-soon" component={ComingSoon} />
            <Route path="/404" component={Error} />
            <Route path="/location" component={Location} />
            <Route path="/shop" component={Shop} />
            <Route path="/allhomestays" component={Homestays} />
            <Route path="/shop-left-sidebar" component={ShopLeftSidebar} />
            <Route path="/shop-right-sidebar" component={ShopRightSidebar} />

            <Route path="/product-details" component={ProdductDetails} />
            {/* blog */}
            <Route path="/blog-grid" component={BlogGrid} />
            <Route path="/blog-left-sidebar" component={BlogLeftSidebar} />
            <Route path="/blog-right-sidebar" component={BlogRightSidebar} />
            <Route path="/blog/:id" component={Blog} />

            <Route path="/blog-details" component={BlogDetails} />
            <Route path="/contact" component={Contact} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/my-account" component={MyAccount} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/add-listing" component={AddListing} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/order-tracking" component={OrderTracking} />
            <Route path="/history" component={History} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById("quarter"));
