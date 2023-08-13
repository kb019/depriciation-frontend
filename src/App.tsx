import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./common/layout";
import Schedule from "./screens/schedule/schedule";
import SidenavLayout from "./common/sidenavLayout";
import Categories from "./screens/categoreis/categories";
import Products from "./screens/products/products";
import AddProducts from "./screens/addProducts/addProducts";


function App() {
  return (
    <Layout>
      <SidenavLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/schedule" replace />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="addProducts" element={<AddProducts />} />
        </Routes>
      </SidenavLayout>
    </Layout>
  );
}

export default App;
