import { Route, Routes } from 'react-router-dom'
import Categories from './pages/collection/Collection';
import Home from './pages/home/Home';
import ProductDetail from './pages/productDetail/ProductDetail';
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { fetchCategories } from './redux/categorySlice';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])

    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/category/:categoryId?" element={<Categories />} />
                <Route path='/products/:productId' element={<ProductDetail />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
