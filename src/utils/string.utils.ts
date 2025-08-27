export const parseToKEuro = (value: number): string => {
    return new Intl.NumberFormat('fr', { notation: 'compact' }).format(value) + "€";
}