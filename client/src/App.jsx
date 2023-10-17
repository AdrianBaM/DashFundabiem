import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { TaskPage } from './pages/TasksPage'
import { TaskFormPage } from './pages/TaskFormPage'
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
        <Route path='/tasks-dash' element={<Home />} />
        <Route path='/tasks-mqtt' element={<MqttClient/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App