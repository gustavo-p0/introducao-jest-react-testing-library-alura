import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Formulario from './index';

describe('Deve renderizar um campo de input', () => {
  test('no documento', () => {
    render(<Formulario />);
    const textInput = screen.getByPlaceholderText('Digite um valor');
    expect(textInput).toBeInTheDocument();
  });

  test('com o type number', () => {
    render(<Formulario />);
    const textInput = screen.getByPlaceholderText('Digite um valor');
    expect(textInput).toHaveAttribute('type', 'number');
  });

  test('que pode ser preenchido', () => {
    render(<Formulario />);

    const textInput = screen.getByPlaceholderText('Digite um valor');
    expect(textInput).toBeInTheDocument();

    userEvent.type(textInput, '50');

    expect(textInput).toHaveValue(50);
  });
});

test('Deve chamar um evento de onSubmit ao clicar em realizar transação', () => {
  const realizarTransacao = jest.fn();
  render(<Formulario realizarTransacao={realizarTransacao} />);
  const button = screen.getByRole('button');

  userEvent.click(button);
  expect(realizarTransacao).toHaveBeenCalledTimes(1);
});

describe('Deve renderizar um campo de selecao', () => {
  beforeEach(() => {
    render(<Formulario />);
  });
  test('no documento', () => {
    const select = screen.getByTestId('select-opcoes');

    expect(select).toBeInTheDocument();
  });

  test('e exibir as opções depósito e transferência', () => {
    const optDeposito = screen.getByText('Depósito');
    const optTransferencia = screen.getByText('Transferência');

    const options = screen.getAllByRole('option');
    options.shift();
    expect(options).toHaveLength(2);
    expect(options).toMatchSnapshot();
  });

  test('e selecionar o campo depósito', () => {
    userEvent.selectOptions(screen.getByTestId('select-opcoes'), ['Depósito']);
    expect(
      screen.getByRole('option', { name: 'Transferência' }).selected,
    ).toBeFalsy();
    expect(
      screen.getByRole('option', { name: 'Depósito' }).selected,
    ).toBeTruthy();
  });

  test('e selecionar o campo transferência', () => {
    userEvent.selectOptions(screen.getByTestId('select-opcoes'), [
      'Transferência',
    ]);

    expect(
      screen.getByRole('option', { name: 'Depósito' }).selected,
    ).toBeFalsy();
    expect(
      screen.getByRole('option', { name: 'Transferência' }).selected,
    ).toBeTruthy();
  });
});
