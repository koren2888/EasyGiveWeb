import { Navigate, useRoutes } from 'react-router-dom';
import Header from './layout/Header/Header';
import Products from './pages/Products/Products';
import MyItems from './pages/MyItems/MyItems';
import { Container } from 'react-bootstrap';

function App() {

  let router = useRoutes([
    { path: '/', element: <Products products={[]} addToCart={() => {}} /> },
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
