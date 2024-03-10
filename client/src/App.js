import './css/App.css';
import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
      </AuthProvider>
    </div>

  );
}

export default App;
