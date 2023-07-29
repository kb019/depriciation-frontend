import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./common/layout";
import Schedule from "./screens/schedule";
import SidenavLayout from "./common/sidenavLayout";
import Categories from "./screens/categories";
import Products from "./screens/products";

function App() {
  return (
    <Layout>
      <SidenavLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/schedule" replace />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
        </Routes>
      </SidenavLayout>
    </Layout>
  );
}

export default App;
