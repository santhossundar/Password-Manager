import './App.css';
import Encryption from './Encryption';
import Decryption from './Decryption';
import Login from './Login'
import Protected from './Protected';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context'

function App() {
  return (
    <AuthProvider>
      <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Protected><Encryption/></Protected>}/>
        <Route path='/decryption' element={<Protected><Decryption/></Protected>}/> 
      </Routes>
    </div>
    </AuthProvider>
    
  )
}

export default App;
