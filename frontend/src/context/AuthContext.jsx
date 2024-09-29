import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clienteAxios from '../api/clienteAxios';
import { generateToken } from '../utils/tokenGenerator'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [documento, setDocumento] = useState(() => localStorage.getItem('documento') || null);
  const [nombres, setNombres] = useState(() => localStorage.getItem('nombres') || null);
  const [celular, setCelular] = useState(() => localStorage.getItem('celular') || null);
  const [email, setEmail] = useState(() => localStorage.getItem('email') || null);
  const [isTokenVerified, setIsTokenVerified] = useState(false); // Para verificar el token

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (documentoInput, celularInput) => {
    setLoading(true);
    try {
      const response = await clienteAxios.post('/clients/send-token', { documento: documentoInput, celular: celularInput });
      const sessionToken = generateToken({ documento: documentoInput, celular: celularInput });

      setToken(sessionToken);
      setDocumento(documentoInput);
      setCelular(celularInput);
      setUser(response.data.user);
      toast.success('¡Inicio de sesión exitoso!');
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error('Error al iniciar sesión');
      return { error: 'Error al iniciar sesión' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (nombres, documentoInput, celularInput, email) => {
    setLoading(true);
    try {
      const response = await clienteAxios.post('/clients/register', { nombres, documento: documentoInput, celular: celularInput, email });
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error('El cliente ya existe.');
      } else {
        toast.error('Error al registrar el cliente');
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (tokenInput) => {
    setLoading(true);
    try {
      const response = await clienteAxios.post('/clients/verify-token', { documento, token: tokenInput });
      if (response.data.isValid) {
        setUser(response.data.user);
        setIsTokenVerified(true);
        toast.success('¡Token verificado exitosamente!');
        return true;
      } else {
        toast.error('Token inválido');
        return false;
      }
    } catch (error) {
      console.error('Error verificando token', error);
      toast.error('Error en la verificación del token');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setDocumento(null);
    setCelular(null);
    setIsTokenVerified(false); // Resetear la verificación del token al cerrar sesión
    localStorage.removeItem('token');
    toast.info('Sesión cerrada');
  };
  
  return (
    <AuthContext.Provider value={{ user, token, documento, celular, nombres, email, isTokenVerified, login, register, verifyToken, logout, loading }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};
