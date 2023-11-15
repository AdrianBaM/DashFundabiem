import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { TaskPage } from './pages/TasksPage'
import { TaskFormPage } from './pages/TaskFormPage'
import { About } from './pages/About'
import { TaskSearch } from './pages/TaskSearch' 
import {MqttClient} from "./pages/mqttClient"
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'


function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Navigate to="/tasks" />} />
        <Route path='/tasks' element={<TaskPage />} />
        <Route path='/tasks-create' element={<TaskFormPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/tasks-search' element={<TaskSearch />} />
        <Route path='/tasks-dash' element={<Home />} />
        <Route path='/tasks-mqtt' element={<MqttClient/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App