import { RefObject, useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, onClickOutside: () => void, shouldInvokeOnBlur?: boolean) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current
                && event.target instanceof Node
                && !ref.current.contains(event.target)
            ) {
                if (shouldInvokeOnBlur) {
                    onClickOutside();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onClickOutside, shouldInvokeOnBlur]);
};

export default useClickOutside;
