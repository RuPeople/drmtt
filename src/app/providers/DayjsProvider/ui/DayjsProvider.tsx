import {
    FC, useEffect, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';

import { DayjsContext } from '../lib/DayjsContext';
import { loadLocale } from '../lib/loadLocale';

export const DayjsProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const { i18n } = useTranslation();

    useEffect(() => {
        loadLocale(i18n.language);
    }, [i18n.language]);

    const contextValue = useMemo(() => ({}), []);

    return (
        <DayjsContext.Provider value={contextValue}>
            {children}
        </DayjsContext.Provider>
    );
};

export default DayjsProvider;
