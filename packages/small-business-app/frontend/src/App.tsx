import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { UsersPage } from './pages/UsersPage';
import { PersonnelPage } from './pages/PersonnelPage';
import { ContractsPage } from './pages/ContractsPage';
import { Layout } from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="hr/personnel" element={<PersonnelPage />} />
        <Route path="hr/contracts" element={<ContractsPage />} />
      </Route>
    </Routes>
  );
}

export default App;