import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Snackbar } from '@mui/material';
import { toast } from 'react-toastify';
import clienteAxios from '../api/clienteAxios';
import { useNavigate } from 'react-router-dom'; 
import registerStyles from '../styles/RegisterStyle';
import Logo from '../assets/img/Pays.png';
import { useTheme } from '../context/ThemeContext';

const Recharge = ({ onBack }) => {
  const [documento, setDocumento] = useState('');
  const [celular, setCelular] = useState('');
  const [monto, setValor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const styles = registerStyles(theme);
  const navigate = useNavigate();

  const handleRecharge = async () => {
    if (!documento || !celular || !monto) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    try {
      const response = await clienteAxios.post('/wallet/recharge', {
        documento,
        celular,
        monto,
      });

      toast.success(response.data.message || 'Recarga exitosa');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Error al recargar la billetera.');
      toast.error(error.response?.data?.message || 'Error al recargar la billetera.');
    } finally {
      setLoading(false);
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
        Recargar
        </Typography>
        <Box style={styles.form}>
      <Typography variant="body1">
        Aquí puedes recargar tu saldo.
      </Typography>
      <TextField
        label="Número de Documento"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
        margin="normal"
        sx={styles.textField}
      />
      <TextField
        label="Número de Teléfono"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        margin="normal"
        sx={styles.textField}
      />
      <TextField
        label="Valor"
        value={monto}
        onChange={(e) => setValor(e.target.value)}
        margin="normal"
        sx={styles.textField}
      />
      <Button variant="contained" onClick={handleRecharge} disabled={loading} style={styles.button}>
        {loading ? 'Cargando...' : 'Recargar'}
      </Button>

      <Button variant="contained" color="primary" onClick={handleLoginRedirect} style={styles.buttonRecarga}>
        Volver al Login
      </Button>
      </Box>
      </Box>
    </Box>
  );
};

export default Recharge;
