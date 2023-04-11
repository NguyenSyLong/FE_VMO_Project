import logo from './logo.svg';
import './App.css';
import Login from './pages/login/login';
import { Routes, Route } from "react-router-dom";
import Apartment from './pages/home/apartment';
import Dweller from './pages/home/dweller';
import ApartmentDetail from './pages/detail/apartmentDetail';
import DwellerDetail from './pages/detail/dwellerDetail';
import AddApartment from './pages/add/addApartment';
import AddDweller from './pages/add/addDweller';
import EditDweller from './pages/edit/editDweller';
import EditApartment from './pages/edit/editApartment';
import Service from './pages/home/service';
import AddService from './pages/add/addService';
import EditService from './pages/edit/editService';
import Bill from './pages/home/bill';
import BillDetail from './pages/detail/billDetail';
import AddBill from './pages/add/addBill';
import EditBill from './pages/edit/editBill';
function App() {
  return (
    <Routes>
      <Route path = "login" element={<Login/>}/>
      <Route path = "listApartments" element={<Apartment/>}/>
      <Route path = "listDwellers" element={<Dweller/>}/>
      <Route path = "apartmentDetail/:id" element={<ApartmentDetail/>}/>
      <Route path = "dwellerDetail/:id" element={<DwellerDetail/>}/>
      <Route path = "addApartment" element={<AddApartment/>}/>
      <Route path = "addDweller" element={<AddDweller/>}/>
      <Route path = "editDweller/:id" element={<EditDweller/>}/>
      <Route path = "editApartment/:id" element={<EditApartment/>}/>
      <Route path = "listServiceFee" element={<Service/>}/>
      <Route path = "addServiceFee" element={<AddService/>}/>
      <Route path = "editServiceFee/:id" element={<EditService/>}/>
      <Route path = "listBills" element={<Bill/>}/>
      <Route path = "billDetail/:id" element={<BillDetail/>}/>
      <Route path = "addBill" element={<AddBill/>}/>
      <Route path = "editBill/:id" element={<EditBill/>}/>
    </Routes>
  );
}

export default App;
