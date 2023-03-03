import { LayoutComponent } from '~/common';
import { Teams, Employees } from '~/page';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Teams />,
    },
    {
      path: '/employees',
      element: <Employees />,
    },
  ]);
  return (
    <div>
      <LayoutComponent>
        <RouterProvider router={router} />
      </LayoutComponent>
    </div>
  );
}

export default App;
