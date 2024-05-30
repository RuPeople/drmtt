import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { useState } from 'react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';

import { Input } from './Input';

export default {
    title: 'shared/Input',
    component: Input,
    args: {
        type: 'text',
        placeholder: 'Placeholder',
        disabled: false,
    },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => {
    const { value } = args;
    const [inputValue, setInputValue] = useState(value ?? '');

    return (
        <Input
            {...args}
            onChange={(e) => {
                setInputValue(e);
            }}
            value={inputValue}
        />
    );
};

export const Primary = Template.bind({});

export const PrimaryDark = Template.bind({});
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
