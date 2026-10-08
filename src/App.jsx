import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PlusCircle, 
  Trash2, 
  PieChart as PieIcon, 
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Salário', amount: 5000, type: 'income', category: 'Trabalho', date: '2026-10-01' },
    { id: 2, description: 'Aluguel', amount: 1800, type: 'expense', category: 'Moradia', date: '2026-10-02' },
    { id: 3, description: 'Supermercado', amount: 650, type: 'expense', category: 'Alimentação', date: '2026-10-05' },
    { id: 4, description: 'Projeto Freelance', amount: 1200, type: 'income', category: 'Trabalho', date: '2026-10-06' },
  ]);

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Alimentação');

  const categories = {
    income: ['Trabalho', 'Investimentos', 'Vendas', 'Outros'],
    expense: ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Outros']
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([newTransaction, ...transactions]);
    setDescription('');
    setAmount('');
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.keys(expensesByCategory).map(cat => ({
    name: cat,
    value: expensesByCategory[cat]
  }));

  const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <Wallet className="text-emerald-500 w-8 h-8" />
              Portal Financeiro
            </h1>
            <p className="text-slate-400 text-sm mt-1">Seu painel de controle de finanças pessoais</p>
          </div>
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-400">
            Domínio: <span className="text-emerald-400 font-semibold">portalfinanceiro.com</span>
          </div>
        </header>

        {/* Top Cards Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-sm font-medium">Saldo Total</span>
              <DollarSign className="w-5 h-5 text-slate-400" />
            </div>
            <div className={`text-3xl font-extrabold ${balance >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
              R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-sm font-medium">Receitas</span>
              <ArrowUpCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-sm font-medium">Despesas</span>
              <ArrowDownCircle className="w-5 h-5 text-rose-500" />
            </div>
            <div className="text-3xl font-extrabold text-rose-500">
              R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form & Chart Column */}
          <div className="space-y-8 lg:col-span-1">
            {/* Form */}
            <div className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-2xl">
              <h2 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                Nova Transação
              </h2>
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Descrição</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Supermercado"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Tipo</label>
                    <select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setCategory(categories[e.target.value][0]);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="expense">Despesa</option>
                      <option value="income">Receita</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Categoria</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      {categories[type].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg shadow-emerald-950/20"
                >
                  Adicionar
                </button>
              </form>
            </div>

            {/* Chart */}
            <div className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-2xl">
              <h2 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-emerald-400" />
                Despesas por Categoria
              </h2>
              {pieData.length > 0 ? (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                        formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-sm text-slate-500 text-center py-8">Nenhuma despesa registrada ainda.</p>
              )}
            </div>
          </div>

          {/* Transactions List Column */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-2xl h-full flex flex-col">
              <h2 className="text-lg font-bold mb-4 text-white">Histórico de Transações</h2>
              
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-xs uppercase bg-slate-900/50 text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-4">Descrição</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4">Data</th>
                      <th className="py-3 px-4 text-right">Valor</th>
                      <th className="py-3 px-4 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-700/20 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-white">{t.description}</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-slate-700/60 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-600">
                            {t.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">{t.date}</td>
                        <td className={`py-3.5 px-4 text-right font-bold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {t.type === 'income' ? '+' : '-'} R$ {t.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleDeleteTransaction(t.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
