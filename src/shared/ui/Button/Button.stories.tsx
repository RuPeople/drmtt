import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';

import {
    Button, ButtonBorderRadius, ThemeButton,
} from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    args: {
        children: 'Text',
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

export const PrimaryDark = Template.bind({});
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Secondary = Template.bind({});
Secondary.args = {
    theme: ThemeButton.SECONDARY,
};

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    theme: ThemeButton.SECONDARY,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Outline = Template.bind({});
Outline.args = {
    theme: ThemeButton.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineSecondary = Template.bind({});
OutlineSecondary.args = {
    theme: ThemeButton.OUTLINE_SECONDARY,
};

export const OutlineSecondaryDark = Template.bind({});
OutlineSecondaryDark.args = {
    theme: ThemeButton.OUTLINE_SECONDARY,
};
OutlineSecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Clear = Template.bind({});
Clear.args = {
    theme: ThemeButton.CLEAR,
};

export const ClearDark = Template.bind({});
ClearDark.args = {
    theme: ThemeButton.CLEAR,
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BorderRadiusM = Template.bind({});
BorderRadiusM.args = {
    borderRadius: ButtonBorderRadius.ROUND_M,
};

export const BorderRadiusL = Template.bind({});
BorderRadiusL.args = {
    borderRadius: ButtonBorderRadius.ROUND_L,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Text',
    disabled: true,
};
