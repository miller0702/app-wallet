import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import clienteAxios from '../api/clienteAxios';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
import '../styles/Switch.scss';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/img/me.png';
import walletStyles from '../styles/WalletStyle';
import { AccountBalance, AddCard, Brightness4, Brightness7, Home, Logout, Payment } from '@mui/icons-material';

const Wallet = ({ onPayment, onRecharge, onLogout }) => {
  const [saldo, setSaldo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transacciones, setTransacciones] = useState([]);
  const { token, documento, nombre, celular } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const styles = walletStyles(theme);

  useEffect(() => {
    const fetchSaldo = async () => {
      setLoading(true);
      try {
        const response = await clienteAxios.get(`/wallet/${documento}/balance`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSaldo(response.data.saldo);
        setTransacciones(response.data.transacciones || []);
      } catch (error) {
        console.error('Error obteniendo saldo', error);
      } finally {
        setLoading(false);
      }
    };

    if (documento) {
      fetchSaldo();
    }
  }, [documento, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate
    onLogout();
  };

  const handleRecharge= () => {
    navigate('/reacharge');
  };

  if (loading) return <Loader />;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logo} alt="Logo" style={{ width: '150px', marginTop: '50px', borderRadius:'100%', backgroundColor:'white' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign:'left' }}>
          <Button fullWidth startIcon={<Home />} sx={{ justifyContent: 'flex-start', textAlign: 'left', width: '100%' }}>Inicio</Button>
          <Button fullWidth startIcon={<Payment />} onClick={onPayment} sx={{ justifyContent: 'flex-start', textAlign: 'left', width: '100%' }}>Hacer Pago</Button>
          <Button fullWidth startIcon={<AddCard />} onClick={handleRecharge} sx={{ justifyContent: 'flex-start', textAlign: 'left', width: '100%' }}>Recargar</Button>
          <Button fullWidth startIcon={theme === 'dark' ? <Brightness7 /> : <Brightness4 />} onClick={toggleTheme} sx={{ justifyContent: 'flex-start', textAlign: 'left', width: '100%' }}>
            Cambiar Tema
          </Button>
          <Button fullWidth onClick={handleLogout} sx={{ justifyContent: 'flex-start', textAlign: 'left', width: '100%' }} startIcon={<Logout />}>Cerrar Sesión</Button>
        </Box>
      </Box>

      <Box component="main" sx={styles.contenido}>
        <Typography variant="h4" gutterBottom style={styles.text}>
          Mi Billetera
        </Typography>

        <Card variant="outlined" sx={styles.card}>
          <CardContent>
            <Typography variant="h5" component="div" style={styles.text}>
              {nombre}
            </Typography>
            <Typography style={styles.text}>Documento: {documento}</Typography>
            <Typography style={styles.text}>Celular: {celular}</Typography>
            <Typography variant="h6" component="div" sx={{ marginTop: '16px' }} style={styles.text} >
              Saldo: ${saldo}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={onRecharge} style={styles.buttonRecarga}>
              Hacer Recarga
            </Button>
            <Button variant="contained" color="secondary" onClick={onPayment} style={styles.button}>
              Realizar Pago
            </Button>
          </CardActions>
        </Card>

        <Box sx={styles.transactionsBox}>
          <Typography variant="h6" gutterBottom style={styles.text}>
            Transacciones
          </Typography>
          {transacciones.length > 0 ? (
            <Box>
              {transacciones.map((transaccion, index) => (
                <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" style={styles.text}>{transaccion.descripcion}</Typography>
                  <Typography variant="body2" style={styles.text}>${transaccion.monto}</Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body1" style={styles.text}>No hay transacciones.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Wallet;
