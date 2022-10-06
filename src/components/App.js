// Author: Ibadehin Mojeed
// https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
import { Routes, Route } from 'react-router-dom';
import Home from '../routes/Home';
import Python from '../routes/Python';
import Layout from './Layout';
import Git from '../routes/Git';
import VirtualMachines from '../routes/VirtualMachines';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Python" element={<Python />} />
          <Route path="Git" element={<Git />} />
          <Route path="VirtualMachines" element={<VirtualMachines />} />
          <Route path="*" element={<p>Not found!</p>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
