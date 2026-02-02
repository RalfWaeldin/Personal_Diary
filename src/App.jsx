import { useState } from "react";
//import reactLogo from './assets/react.svg'
import Header from "./components/section_Header";
import Main from "./components/section_Main";
import Footer from "./components/section_Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
