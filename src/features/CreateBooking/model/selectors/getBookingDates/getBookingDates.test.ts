import { StateSchema } from 'app/providers/StoreProvider';

import { getBookingDates } from './getBookingDates';

jest.mock('axios');

describe('getBookingDates', () => {
    test('returns booking dates when state is provided', async () => {
        const state: DeepPartial<StateSchema> = {
            booking: {
                bookingDates: {
                    '2023-01-01': {
                        '08:00': {
                            day: 'Monday',
                            begin: '08:00',
                            end: '09:00',
                            date: '2023-01-01',
                            isBooked: false,
                        },
                    },
                },
            },
        };

        expect(getBookingDates(state as StateSchema)).toEqual({
            '2023-01-01': {
                '08:00': {
                    day: 'Monday',
                    begin: '08:00',
                    end: '09:00',
                    date: '2023-01-01',
                    isBooked: false,
                },
            },
        });
    });

    test('returns empty object when state is undefined', async () => {
        const state: DeepPartial<StateSchema> = {
            booking: undefined,
        };

        expect(getBookingDates(state as StateSchema)).toEqual({});
    });

    test('returns empty object when bookingDates is undefined', async () => {
        const state: DeepPartial<StateSchema> = {
            booking: {
                bookingDates: undefined,
            },
        };

        expect(getBookingDates(state as StateSchema)).toEqual({});
    });
});
