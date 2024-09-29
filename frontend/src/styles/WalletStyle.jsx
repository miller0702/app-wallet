import themeColors from '../utils/Colors';
import backgroundImage from '../assets/img/fondo.png';

const walletStyles = (theme) => {
    const colors = themeColors[theme];

    return {
        container: {
            height: '100vh',
            backgroundColor: colors.background,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            display: 'flex',
        },
        text:{
            color:colors.text
        },
        button: {
            backgroundColor: colors.buttonBackground,
            color: colors.buttonText,
          },
          buttonRecarga: {
              backgroundColor: colors.secundary,
              color: colors.buttonText,
            },
        sidebar: {
            width: 250,
            bgcolor: colors.sidebar,
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
        },

        contenido: {
            flexGrow: 1, padding: 2, marginLeft: 2, bgcolor: colors.background
        },
        card: {
            width: '400px',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            background: colors.background, // Fondo de la tarjeta
        },
        transactionsBox: {
            mt: 3,
            width: '400px',
            bgcolor: colors.transactionsBackground, // Fondo de las transacciones
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        logoutButton: {
            marginTop: '20px',
        },
    };
};

export default walletStyles;
