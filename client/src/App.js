import {Routes, Route} from 'react-router-dom'
import Login from './Login'
import Encryption from './Encryption'
import Decryption from './Decryption'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="encryption" element={ <Encryption/> } />
        <Route path="decryption" element={ <Decryption/> } />
      </Routes>
    </div>
  )
}

export default App;
