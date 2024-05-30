import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { useState } from 'react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';

import { PhoneInput } from './PhoneInput';

export default {
    title: 'shared/PhoneInput',
    component: PhoneInput,
    args: {
        type: 'text',
        placeholder: 'Placeholder',
        disabled: false,
    },
} as ComponentMeta<typeof PhoneInput>;

const Template: ComponentStory<typeof PhoneInput> = (args) => {
    const { value } = args;
    const [inputValue, setInputValue] = useState(value ?? '');

    return (
        <PhoneInput
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
