import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import clienteAxios from '../api/clienteAxios';
import useAuth from '../hooks/useAuth';

const Payment = ({ onSuccess }) => {
  const [documento, setDocumento] = useState('');
  const [celular, setCelular] = useState('');
  const [monto, setMonto] = useState('');
  const [token, setToken] = useState('');
  const [isCustomerValid, setIsCustomerValid] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [sessionId, setSessionId] = useState('');

  const handleValidateCustomer = async () => {
    console.log('Validando cliente:', { documento, celular });
    try {
      const response = await clienteAxios.post('/clients/validate', { documento, celular });
      console.log('Respuesta del servidor:', response.data);

      if (response.data.valid) {
        setCustomerName(response.data.client.nombres);
        setIsCustomerValid(true);
      } else {
        alert('Cliente no encontrado: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error validando cliente', error);
      alert('Error al validar cliente: ' + (error.response?.data?.message || error.message));
    }
  };

  const handlePayment = async () => {
    console.log('Realizando pago con los siguientes datos:', {
      documento,
      celular,
      monto,
    });
    try {
      const response = await clienteAxios.post('/wallet/pay', {
        documento: documento,
        celular: celular,
        monto: monto,
      });

      if (response.data.sessionId) {
        setSessionId(response.data.sessionId);
        alert('Pago solicitado. Se ha enviado un token al correo.');
      } else {
        alert('Error en el pago: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error realizando pago', error);
      alert('Error realizando pago: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleConfirmPayment = async () => {
    try {
      const response = await clienteAxios.post('/wallet/confirm-payment', {
        sessionId: sessionId,
        documento: documento,
        token: token,
      });

      alert('Pago confirmado. Saldo actualizado: ' + response.data.saldo);
      onSuccess();
    } catch (error) {
      console.error('Error confirmando pago', error);
      alert('Error confirmando pago: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h5">Realizar Pago</Typography>
      <TextField
        label="Número de Documento"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Número de Teléfono"
        value={celular}
        onChange={(e) => setCelular(e.target.value)}
        margin="normal"
      />
      <Button onClick={handleValidateCustomer}>Validar Cliente</Button>
      {isCustomerValid && (
        <>
          <Typography variant="body1">Cliente: {customerName}</Typography>
          <TextField
            label="Monto"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            margin="normal"
          />
          <Button onClick={handlePayment}>Realizar Pago</Button>
        </>
      )}
      {sessionId && (
        <>
          <TextField
            label="Token del Correo"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleConfirmPayment}>Confirmar Pago</Button>
        </>
      )}
    </Box>
  );
};

export default Payment;
