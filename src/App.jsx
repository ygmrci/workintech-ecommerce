import Header from "./layout/Header";
import PageContent from "./layout/PageContent";
import Footer from "./layout/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageContent />
      <Footer />
    </div>
  );
}

export default App;
