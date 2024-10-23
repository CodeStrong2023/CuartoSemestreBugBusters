import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import RegisterPage from "./pages/RegisterPage"
import TareasPage from "./pages/TareasPage"
import TareaFormPage from "./pages/TareaFormPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/tareas" element={<TareasPage/>} />
      <Route path="/tareas/crear" element={<TareaFormPage/>} />
      <Route path="/tareas/editar" element={<TareaFormPage/>} />
    </Routes>
  )
}

export default App