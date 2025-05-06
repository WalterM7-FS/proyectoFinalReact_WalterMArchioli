
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfileProvider } from './contexts/ProfileContext';
import AppRouter from './Router/AppRouter';

function App() {
  return (
    <ProfileProvider>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </ProfileProvider>
  );
}

export default App;