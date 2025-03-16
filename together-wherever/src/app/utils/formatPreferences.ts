export const formatPreference = (preference: string): string => {
    return preference
        .split('_')
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(' ');
};
