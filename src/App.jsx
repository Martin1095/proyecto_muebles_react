import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Carrito from "./pages/Carrito";
import Contact from "./pages/Contact";
import IniciarSesion from "./pages/IniciarSesion";
import Registrarse from "./pages/Registrarse";
import Tutoriales from "./pages/Tutoriales";
import Admin from "./pages/Admin";
import './styles/global.css';
import TutorialDetail from './pages/TutorialDetail';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tutoriales" element={<Tutoriales />} />
        <Route path="/tutoriales/:id" element={<TutorialDetail />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}


export default App;
