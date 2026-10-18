// src/App.jsx
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";

function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        {/* More sections will be added here */}
      </main>
    </>
  );
}

export default App;
