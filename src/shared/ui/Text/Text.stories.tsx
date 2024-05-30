import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';

import { Text, TextTheme } from './Text';

export default {
    title: 'shared/Text',
    component: Text,
    args: {
        isOpen: true,
        children: 'lorem',
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});

export const PrimaryDark = Template.bind({});
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Danger = Template.bind({});
Danger.args = {
    theme: TextTheme.DANGER,
};

export const H1 = Template.bind({});
H1.args = {
    as: 'h1',
};

export const H2 = Template.bind({});
H2.args = {
    as: 'h2',
};

export const H3 = Template.bind({});
H3.args = {
    as: 'h3',
};

export const H4 = Template.bind({});
H4.args = {
    as: 'h4',
};

export const H5 = Template.bind({});
H5.args = {
    as: 'h5',
};

export const Span = Template.bind({});
Span.args = {
    as: 'span',
};

export const P = Template.bind({});
P.args = {
    as: 'p',
};
