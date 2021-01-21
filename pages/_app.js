import AuthState from '../context/auth/authState';
import AppState from '../context/app/appState';

const Init = ({ Component, pageProps }) => {
  return (

    <AuthState>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </AuthState>

  )
}

export default Init
