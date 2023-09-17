import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCatList from "./pages/BlogCatList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddColor from "./pages/AddColor";
import AddCat from "./pages/AddCat";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="perguntas" element={<Enquiries />} />
          <Route path="perguntas/:id" element={<ViewEnq />} />
          <Route path="blog-lista" element={<BlogList />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="blog/:id" element={<AddBlog />} />
          <Route path="cupom-lista" element={<CouponList />} />
          <Route path="cupom" element={<AddCoupon />} />
          <Route path="cupom/:id" element={<AddCoupon />} />
          <Route path="blog-categoria-lista" element={<BlogCatList />} />
          <Route path="blog-categoria" element={<AddBlogCat />} />
          <Route path="blog-categoria/:id" element={<AddBlogCat />} />
          <Route path="pedidos" element={<Orders />} />
          <Route path="pedidos/:id" element={<ViewOrder />} />
          <Route path="clientes" element={<Customers />} />
          <Route path="cor-lista" element={<ColorList />} />
          <Route path="cor" element={<AddColor />} />
          <Route path="cor/:id" element={<AddColor />} />
          <Route path="categoria-lista" element={<CategoryList />} />
          <Route path="categoria" element={<AddCat />} />
          <Route path="categoria/:id" element={<AddCat />} />
          <Route path="marca-lista" element={<BrandList />} />
          <Route path="marca" element={<AddBrand />} />
          <Route path="marca/:id" element={<AddBrand />} />
          <Route path="produto-lista" element={<ProductList />} />
          <Route path="produto" element={<AddProduct />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
