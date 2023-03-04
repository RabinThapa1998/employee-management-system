import { ListingLayout, MainLayout } from '~/common';
import { Teams, Employees, AddEmployee } from '~/page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store, persistor } from '~/global-states';
import { PersistGate } from 'redux-persist/integration/react';
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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1e83f7',
                colorWarning: '#ffac1c',
                colorSuccess: '#20bc08',
                fontFamily: 'Nunito Sans, sans-serif',
              },
              components: {
                Typography: {
                  fontSizeHeading1: 24,
                  fontSizeHeading2: 20,
                  fontSizeHeading3: 18,
                  fontSizeHeading4: 15,
                  fontSizeHeading5: 12,
                  lineHeightHeading1: 1.5,
                  lineHeightHeading2: 1.5,
                  lineHeightHeading3: 1.5,
                  lineHeightHeading4: 1.5,
                  lineHeightHeading5: 1.5,
                },
              },
            }}
          >
            <RouterProvider router={router} />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
