import 'app/styles/index.scss';

import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import { ReactElement } from 'react';

export const StyleDecorator = (story: () => ReactElement): StoryFnReactReturnType => {
    return story();
};
