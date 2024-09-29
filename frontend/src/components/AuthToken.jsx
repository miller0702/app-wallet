import React, { useContext, useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import tokenStyles from '../styles/TokenStyle';
import { useNavigate } from 'react-router-dom';

const AuthToken = ({ onTokenVerified }) => {
  const { verifyToken } = useContext(AuthContext);
  const [token, setToken] = useState(['', '', '', '', '', '']);
  const { theme } = useTheme();
  const styles = tokenStyles(theme);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newToken = [...token];

    if (value.length > 1) {
      const pastedValue = value.slice(0, 6);
      setToken(pastedValue.split('').map((char, idx) => (idx < 6 ? char : '')));
      return;
    }

    newToken[index] = value.slice(-1);
    setToken(newToken);

    if (value && index < 5) {
      document.getElementById(`token-input-${index + 1}`).focus();
    }
  };

  const handleSubmitToken = async () => {
    const tokenString = token.join('');
    const isValid = await verifyToken(tokenString);
    if (isValid) {
      navigate('/wallet');
      onTokenVerified();
    }
  };

  return (
    <Box style={styles.fondo}>
      <Box style={styles.container}>
        <Typography variant="h6" gutterBottom style={styles.texto}>
          Ingresa el Token de Inicio de Sesión
        </Typography>
        <Box style={styles.form}>
          <Box display="flex" justifyContent="center" mt={2}>
            {token.map((digit, index) => (
              <TextField
                key={index}
                id={`token-input-${index}`}
                label=""
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                margin="normal"
                inputProps={{ maxLength: 1 }}
                sx={styles.textField}
              />
            ))}
          </Box>
          <Button variant="contained" onClick={handleSubmitToken} style={styles.button}>
            Confirmar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthToken;
