import 'devextreme/dist/css/dx.light.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import MenuDataGrid from './components/MenuDataGrid';
import UserManagementPage from "./pages/UserManagementPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/page1" element={<UserManagementPage />}></Route>
          <Route path="/page2" element={<MenuDataGrid />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
