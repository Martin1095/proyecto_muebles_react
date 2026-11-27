import { useState } from 'react';
import { AuthContext } from './auth';

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => localStorage.getItem('sesion') || '');
  const [rol, setRol] = useState(() => localStorage.getItem('rol') || '');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  function iniciarSesion(nombre, rolUsuario = 'CLIENTE', jwtToken = '') {
    localStorage.setItem('sesion', nombre);
    localStorage.setItem('rol', rolUsuario);
    if (jwtToken) {
      localStorage.setItem('token', jwtToken);
    }
    setUsuario(nombre);
    setRol(rolUsuario);
    setToken(jwtToken);
  }

  function cerrarSesion() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    setUsuario('');
    setRol('');
    setToken('');
  }

  return (
    <AuthContext.Provider value={{ usuario, rol, token, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  );
}