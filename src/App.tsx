import "./App.css";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./common/layout";
import Schedule from "./screens/schedule/schedule";
import SidenavLayout from "./common/sidenavLayout";
import Categories from "./screens/categoreis/categories";
import Products from "./screens/products/products";
import AddProducts from "./screens/addProducts/addProducts";
import ItemInfo from "./screens/itemInfo/itemInfo";
import ProductTypes from "./screens/productTypes/productTypes";

function App() {
  return (
    <Layout>
      <SidenavLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/schedule" replace />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="categories" element={<Categories />} />
          <Route path="productTypes" element={<ProductTypes />} />
          <Route path="products" element={<Outlet />}>
            <Route path="" element={<Products />} />
            <Route path="info/:productId" element={<ItemInfo />} />
          </Route>
          <Route path="addProducts" element={<AddProducts />} />
        </Routes>
      </SidenavLayout>
    </Layout>
  );
}

export default App;
