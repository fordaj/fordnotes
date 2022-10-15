// Author: Ibadehin Mojeed
// https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from '../routes/Home';
// Coding
import Python from '../routes/Python';
// Computers
import Git from '../routes/Git';
import VirtualMachines from '../routes/VirtualMachines';
// Firmware
import RAMTest from '../routes/Firmware/RAMTest';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Coding */}
          <Route path="Python" element={<Python />} />
          {/* Firmware */}
          <Route path="RAMTest" element={<RAMTest />} />
          {/* Computers */}
          <Route path="Git" element={<Git />} />
          <Route path="VirtualMachines" element={<VirtualMachines />} />
          <Route path="*" element={<p>Not found!</p>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
