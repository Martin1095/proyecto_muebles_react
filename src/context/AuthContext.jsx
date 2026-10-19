import { useState } from 'react';
import { AuthContext } from './auth';

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => localStorage.getItem('sesion') || '');

    function iniciarSesion(nombre) {
    localStorage.setItem('sesion', nombre);
    setUsuario(nombre);
    }

    function cerrarSesion() {
    localStorage.removeItem('sesion');
    setUsuario('');
    }

    return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
        {children}
    </AuthContext.Provider>
    );
}
