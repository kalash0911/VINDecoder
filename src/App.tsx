import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { VariableDetailPage } from './pages/VariableDetailPage';
import { VariablesPage } from './pages/VariablesPage';

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="variables" element={<VariablesPage />} />
          <Route path="variables/:variableId" element={<VariableDetailPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
