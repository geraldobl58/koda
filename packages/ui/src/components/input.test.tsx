import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('associa o label ao input via htmlFor/id', () => {
    render(<Input label="E-mail" />);
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
  });

  it('não renderiza label quando não informado', () => {
    render(<Input placeholder="sem label" />);
    expect(screen.queryByText('E-mail')).not.toBeInTheDocument();
  });

  it('aceita digitação do usuário', async () => {
    const user = userEvent.setup();
    render(<Input label="E-mail" />);

    const input = screen.getByLabelText('E-mail');
    await user.type(input, 'teste@exemplo.com');

    expect(input).toHaveValue('teste@exemplo.com');
  });

  it('exibe mensagem de erro e marca aria-invalid', () => {
    render(<Input label="E-mail" error="E-mail inválido" />);

    const input = screen.getByLabelText('E-mail');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('E-mail inválido')).toBeInTheDocument();
  });

  it('não marca aria-invalid quando não há erro', () => {
    render(<Input label="E-mail" />);
    expect(screen.getByLabelText('E-mail')).not.toHaveAttribute('aria-invalid');
  });

  it('usa o id customizado quando informado', () => {
    render(<Input label="E-mail" id="email-field" />);
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('id', 'email-field');
  });
});
