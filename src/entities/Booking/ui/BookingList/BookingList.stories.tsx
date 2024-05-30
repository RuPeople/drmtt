import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Booking } from 'entities/Booking';
import React from 'react';

import { BookingList } from './BookingList';

export default {
    title: 'entities/Booking/BookingList',
    component: BookingList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof BookingList>;

const Template: ComponentStory<typeof BookingList> = (args) => (
    <BookingList {...args} />
);

const booking: Booking = {
    id: 1717071422770,
    phoneNumber: '79020609232',
    name: 'Давид ;0',
    city: {
        id: '9b918db7-0c38-4aee-af99-6a5f51e90723',
        name: 'Артем',
        address: 'ул. Большая 19',
        phones: [
            '79990010101',
            '74232777272',
            '79993320102',
        ],
        price: 2000,
    },
    bookingSlot: {
        day: '2024-05-30',
        begin: '10:00',
        end: '11:00',
        date: '2024-05-30 10:00:00',
        isBooked: false,
    },
};

export const Loading = Template.bind({});
Loading.args = {
    bookingList: [],
    isLoading: true,
};

export const List = Template.bind({});
List.args = {
    bookingList: new Array(9).fill(0).map(() => ({
        ...booking,
    })),
    isLoading: false,
};
