import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginAdmin from './Pages/Admin/LoginAdmin';
import AdminRegister from './Pages/Admin/RegisterAdmin';
import Home from './Pages/Admin/Home';
import TambahData from './Pages/Admin/PageAdmin/TambahData';
import ListArtikel from './Pages/Admin/PageAdmin/ListArtikel';
import EditArtikel from './Pages/Admin/PageAdmin/EditArtikel';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginAdmin />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/HomeAdmin" element={<Home />} />
        <Route path="/HomeAdmin/tambahData" element={<TambahData />} />
        <Route path="/HomeAdmin/listArtikel" element={<ListArtikel />} />
        <Route path="/HomeAdmin/EditArtikel/:id" element={<EditArtikel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
