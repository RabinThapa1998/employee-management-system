import { ListingLayout, MainLayout } from '~/common';
import { Teams, Employees, AddEmployee, EditEmployee } from '~/page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { store, persistor } from '~/global-states';
import { PersistGate } from 'redux-persist/integration/react';
import { AddTeam } from './page/AddTeam';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

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
    {
      path: '/employees/:id',
      element: (
        <MainLayout>
          <EditEmployee />
        </MainLayout>
      ),
    },
    {
      path: '/add-team',
      element: (
        <MainLayout>
          <AddTeam />
        </MainLayout>
      ),
    },
  ]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#1e83f7',
                  colorWarning: '#ffac1c',
                  colorSuccess: '#20bc08',
                  colorTextDisabled: '#656669',
                  colorBgContainer: '#F9F9F9',
                  colorBgContainerDisabled: '#F1F1F1',
                  colorBorder: '#C3C1BF',
                  colorText: '#24252A',
                  fontFamily: 'Nunito Sans, sans-serif',
                  borderRadius: 5,
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
                    fontWeightStrong: 800,
                    margin: 0,
                  },
                  Breadcrumb: {
                    fontSize: 12,
                    colorText: '#656669',
                    fontWeightStrong: 600,
                  },
                  Button: {
                    controlHeight: 36,
                    borderRadius: 5,
                  },
                  Form: {
                    fontSize: 15,
                    fontWeightStrong: 600,
                  },
                },
              }}
            >
              <RouterProvider router={router} />
            </ConfigProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
