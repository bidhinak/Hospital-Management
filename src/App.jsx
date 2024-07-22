import { BrowserRouter, Route, Routes } from "react-router-dom";
import Router from "./Routes/Router";
import { Provider } from "react-redux";
import  { Store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react";


function App() {
  return (
    <>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={Store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Router />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
      </PersistGate>
    </>
  );
}

export default App;
