import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import useAuth from '../hooks/useAuth';
import loginStyles from '../styles/LoginStyle';
import { useTheme } from '../context/ThemeContext';
import Logo from '../assets/img/Pays.png'
import { useNavigate } from 'react-router-dom';

const Login = ({ onToken, onRecharge }) => {
  const { theme } = useTheme();
  const [documento, setDocumento] = useState('');
  const [celular, setCelular] = useState('');
  const { login, loading } = useAuth();
  const styles = loginStyles(theme);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(documento, celular);
    if (result && !result.error) {
      navigate('/wallet');
    } else {
      alert('Error al iniciar sesión, por favor verifica tus datos.');
    }
  };

  const handleRecharge= () => {
    navigate('/reacharge');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <Box style={styles.fondo}>
      <Box style={styles.container}>
        <img src={Logo} alt="Logo del app" style={styles.logo} />
        <Typography variant="h4" gutterBottom style={styles.texto}>
          Ingresa a tu billetera
        </Typography>
        <Box style={styles.form}>
          <TextField
            label="Número de Documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
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
          <Button variant="contained" onClick={handleLogin} disabled={loading} style={styles.button}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>

          <Button
            variant="text"
            color="secondary"
            onClick={handleRegister}
            style={{ marginTop: '10px' }}
          >
            ¿No tienes cuenta? Regístrate aquí
          </Button>

          <Button
            variant="contained"
            onClick={handleRecharge}
            style={styles.buttonRecarga}
          >
            Ir a Recargar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
