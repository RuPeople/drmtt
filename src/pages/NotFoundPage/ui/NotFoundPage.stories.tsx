import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';

export default {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotFoundPage>;

const Template:
    ComponentStory<typeof NotFoundPage> = () => <NotFoundPage />;

export const Light = Template.bind({});
Light.args = {
};

export const Dark = Template.bind({});
Dark.args = {
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
