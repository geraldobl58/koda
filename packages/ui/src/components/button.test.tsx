import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renderiza o texto passado como children', () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });

  it('aplica a variante primary por padrão', () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-brand-500');
  });

  it('aplica a variante secondary quando informada', () => {
    render(<Button variant="secondary">Cancelar</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-neutral-0');
  });

  it('chama onClick ao ser clicado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Salvar</Button>);

    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('não chama onClick quando desabilitado', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Salvar
      </Button>,
    );

    await user.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('mescla className customizada sem perder as classes base', () => {
    render(<Button className="w-full">Salvar</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('bg-brand-500');
  });
});
