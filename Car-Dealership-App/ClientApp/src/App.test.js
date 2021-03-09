import React from 'react';
import  ReactDOM  from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import Inventory from './components/Inventory';
 it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div);
  await new Promise(resolve => setTimeout(resolve, 1000));
});  

/* it('renders without crashing', async () => {
  const div = document.createElement('div');
  
  
   ReactDOM.render(
     <MemoryRouter initialEntries={["/inventory"]} >
      <Inventory />
    </MemoryRouter>, div);


  await new Promise(resolve => setTimeout(resolve, 1000));
});
 */

 