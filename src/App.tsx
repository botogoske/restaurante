import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cadastros from "./pages/Cadastros";
import Relatorios from "./pages/Relatorios";
import NovoFuncionario from "./pages/funcionarios/Novo";
import Funcionarios from "./pages/funcionarios/Index";
import NovoFornecedor from "./pages/fornecedores/Novo";
import Fornecedores from "./pages/fornecedores/Index";
import NovoPrato from "./pages/pratos/Novo";
import Pratos from "./pages/pratos/Index";
import NovoCliente from "./pages/clientes/Novo";
import NovoCardapio from "./pages/cardapio/Novo";
import NovoPedido from "./pages/pedidos/Novo";
import NovoPagamento from "./pages/pagamentos/Novo";
import NotFound from "./pages/NotFound";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout onLogout={() => setIsLoggedIn(false)} />}>
        <Route path="/" element={<Home />} />
        <Route path="/cadastros" element={<Cadastros />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/funcionarios/novo" element={<NovoFuncionario />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/fornecedores/novo" element={<NovoFornecedor />} />
        <Route path="/pratos" element={<Pratos />} />
        <Route path="/pratos/novo" element={<NovoPrato />} />
        <Route path="/clientes/novo" element={<NovoCliente />} />
        <Route path="/cardapio/novo" element={<NovoCardapio />} />
        <Route path="/pedidos/novo" element={<NovoPedido />} />
        <Route path="/pagamentos/novo" element={<NovoPagamento />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
