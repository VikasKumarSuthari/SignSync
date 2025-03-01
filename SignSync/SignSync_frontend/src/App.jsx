import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';  // Ensure your global styles are imported
import 'regenerator-runtime/runtime';
import Header from './components/layout/Header';  // Import the Header component
import Navbar from './components/layout/Navbar';  // Import the Navbar component
import Footer from './components/layout/Footer';  // Import the Footer component
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Mobile from './pages/MobileApp';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Profile from './pages/Profile';
import Error from './pages/Error404';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Testimonials from './pages/Testimonials';
import Demo from './pages/demo';
//import LearnSign from './pages/LearnSign';
import Dictphone from './pages/Dictphone';
import Model from './pages/ModelPage';

//import Header from './components/layout/heder';
function App() {
  return (
    <Router>
      {/* Add Header and Navbar outside of Routes so they are always displayed */}
      <Header />

      {/* Main content area where routes will be rendered */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/testimonials" element={<Testimonials/>}/>
          <Route path="/demo" element={<Demo />} />
          {/*<Route path="/learn" element={<LearnSign/>}/>*/}
          <Route path='/dictphone' element={<Dictphone/>}/>
          <Route path='/model' element={<Model/>}/>

        </Routes>
      </div>

      {/* Add Footer component, it will be displayed at the bottom of every page */}
      <Footer />
    </Router>
  );
}

export default App;
