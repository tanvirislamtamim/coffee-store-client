import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayouts from './Layouts/MainLayouts.jsx';
import Home from './Components/Home.jsx';


import CoffeeDetails from './Components/CoffeeDetails.jsx';
import UpdateCoffee from './Components/UpdateCoffee.jsx';
import AddCoffee from './Components/AddCoffee.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        index: true,
        loader: ()=> fetch('http://localhost:3000/coffees'),
        element: <Home />,
      },
      {
        path: 'addCoffie',
        element: <AddCoffee />,
      },
      {
        path: 'coffeeDetails/:id',
        element: <CoffeeDetails></CoffeeDetails>

      },
      {
        path: 'updateCoffee/:id',
        loader: ({params})=> fetch(`http://localhost:3000/coffees/${params.id}`),
        element: <UpdateCoffee />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);