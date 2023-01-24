import { Navigate, useRoutes } from 'react-router-dom';
import Header from './layout/Header/Header';
import Items from './pages/Items/Items';
import MyItems from './pages/MyItems/MyItems';
import { Container } from 'react-bootstrap';

function App() {

  let router = useRoutes([
    { path: '/', element: <Items /> },
    { path: '/my-items', element: <MyItems /> },
    { path: '*', element: <Navigate to={'/'} /> },
  ])

  return (
    <>
      <Header />
      <Container className='app-container'>
        {router}
      </Container>
    </>
  );
}

export default App;
