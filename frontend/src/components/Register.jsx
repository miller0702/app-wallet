import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';
import registerStyles from '../styles/RegisterStyle';
import Logo from '../assets/img/Pays.png';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Importar useNavigate y useLocation

const Register = ({ onSuccess }) => {
  const [nombres, setNombres] = useState('');
  const [documento, setDocumento] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const { register, loading } = useAuth();
  const { theme } = useTheme();
  const styles = registerStyles(theme);
  const navigate = useNavigate();


  const handleRegister = async () => {
    if (!nombres || !documento || !celular || !email) {
      toast.error('Todos los campos son obligatorios');
      return;
    }
  
    try {
      await register(nombres, documento, celular, email);
      toast.success('Registro exitoso');
      navigate('/login'); 
    } catch (error) {
      toast.error('Error al registrar');
    }
  };
  

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Box style={styles.fondo}>
      <Box style={styles.container}>
        <img src={Logo} alt="Logo del app" style={styles.logo} />
        <Typography variant="h4" gutterBottom style={styles.texto}>
          Registro
        </Typography>
        <Box style={styles.form}>
          <TextField
            label="Nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            margin="normal"
            fullWidth
            sx={styles.textField}
          />
          <TextField
            label="Número de Documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            margin="normal"
            fullWidth
            sx={styles.textField}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            fullWidth
            sx={styles.textField}
          />
          <TextField
            label="Número de Teléfono"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            margin="normal"
            fullWidth
            sx={styles.textField}
          />
          <Button 
            variant="contained" 
            onClick={handleRegister} 
            disabled={loading} 
            style={styles.button}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </Button>
        </Box>
        
        <Box mt={2}>
          <Typography variant="body1">
            ¿Ya tienes una cuenta? 
            <Button 
              onClick={handleLoginRedirect} 
              sx={{ textDecoration: 'underline', marginLeft: 1 }} 
              color="primary"
            >
              Inicia sesión
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
