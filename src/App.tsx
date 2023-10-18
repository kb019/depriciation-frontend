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
import RatesIt from "./screens/productTypes/ratesIt";
import InfoMessage from "./common/infoMessage";
import PageNotExist from "./common/pageNotExsist";
import Authentication from "./components/authentication/authentication";
import CompanyDetails from "./components/authentication/compnayDetails";
import Profile from "./screens/profile/profile";

function App() {
  return (
    <Authentication>
      <CompanyDetails>
        <Layout>
          <SidenavLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/schedule" replace />} />

              <Route path="/schedule" element={<Schedule />} />
              <Route path="categories" element={<Categories />} />
              <Route path="profile" element={<Profile />} />
              <Route path="productTypes" element={<Outlet />}>
                <Route path="" element={<Navigate to="list" replace />}></Route>
                <Route path="list" element={<ProductTypes />}></Route>
                <Route path="fillrates" element={<RatesIt />}></Route>
              </Route>
              <Route path="products" element={<Outlet />}>
                <Route path="" element={<Navigate to="list" replace />}></Route>
                <Route path="list" element={<Products />} />
                <Route path="info" element={<Outlet />}>
                  <Route
                    path=""
                    element={
                      <InfoMessage message="Please select a product to view Details" />
                    }
                  ></Route>
                  <Route path=":productId" element={<ItemInfo />}></Route>
                </Route>
              </Route>
              <Route path="addProducts" element={<AddProducts />} />
              <Route path="*" element={<PageNotExist />}></Route>
            </Routes>
          </SidenavLayout>
        </Layout>
      </CompanyDetails>
    </Authentication>
  );
}

export default App;
