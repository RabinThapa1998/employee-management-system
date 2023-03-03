import { LayoutComponent } from '~/common';
import { Teams, Employees } from '~/page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <LayoutComponent>
          <Teams />
        </LayoutComponent>
      ),
    },
    {
      path: '/employees',
      element: (
        <LayoutComponent>
          <Employees />
        </LayoutComponent>
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
