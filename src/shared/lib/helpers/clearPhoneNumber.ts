export const clearPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/\D/g, '');
};
