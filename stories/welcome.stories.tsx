import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Welcome } from '../app/welcome/welcome';


const meta: Meta<typeof Welcome> = {
  title: 'Components/Welcome',
  component: Welcome,
};

export default meta;

type Story = StoryObj<typeof Welcome>;

// Basic story
export const Default: Story = {};
