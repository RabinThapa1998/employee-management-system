import { ListingLayout, MainLayout } from '~/common';
import { Teams, Employees, AddEmployee } from '~/page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
