import './App.css';
import './common-styles/common-styles.css';
import Header from './components/react-components/Header/Header';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div className='app'>
      <Header />
      <AppRouter />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
