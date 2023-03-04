import { ListingLayout, MainLayout } from '~/common';
import { Teams, Employees, AddEmployee } from '~/page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ListingLayout>
          <Teams />
        </ListingLayout>
      ),
    },
    {
      path: '/employees',
      element: (
        <ListingLayout>
          <Employees />
        </ListingLayout>
      ),
    },
    {
      path: '/add-employee',
      element: (
        <MainLayout>
          <AddEmployee />
        </MainLayout>
      ),
    },
  ]);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1e83f7',
            colorWarning: '#ffac1c',
            colorSuccess: '#20bc08',
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  );
}

export default App;
