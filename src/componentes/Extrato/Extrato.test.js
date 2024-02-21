import { render, screen } from '@testing-library/react';
import Extrato from './index';

describe('', () => {
  test('Deve renderizar uma lista de transações', () => {
    //definição de props
    const transactions = [
      {
        transacao: 'Depósito',
        valor: 100,
      },
    ];

    render(<Extrato transacoes={transactions} />);
    const list = screen.getByRole('listitem');
    expect(list).toBeInTheDocument();
  });
});
