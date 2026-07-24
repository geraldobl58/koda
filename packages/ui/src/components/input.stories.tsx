import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'E-mail',
    placeholder: 'voce@exemplo.com',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: 'E-mail inválido',
    defaultValue: 'nao-e-um-email',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'valor desabilitado',
  },
};
