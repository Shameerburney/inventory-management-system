export const INITIAL_PRODUCTS = [
    {
        id: '1',
        name: 'iPhone 14 Pro',
        brand: 'Apple',
        model: '14 Pro',
        basePrice: 999,
        stock: 24,
        imageUrl: 'https://placehold.co/100x100?text=iPhone',
        variants: []
    },
    {
        id: '2',
        name: 'Samsung S23 Ultra',
        brand: 'Samsung',
        model: 'S23 Ultra',
        basePrice: 1199,
        stock: 8,
        imageUrl: 'https://placehold.co/100x100?text=Samsung',
        variants: []
    },
    {
        id: '3',
        name: 'Pixel 7',
        brand: 'Google',
        model: 'Pixel 7',
        basePrice: 599,
        stock: 0,
        imageUrl: 'https://placehold.co/100x100?text=Pixel',
        variants: []
    },
    {
        id: '4',
        name: 'OnePlus 11',
        brand: 'OnePlus',
        model: '11',
        basePrice: 699,
        stock: 15,
        imageUrl: 'https://placehold.co/100x100?text=OnePlus',
        variants: []
    },
    {
        id: '5',
        name: 'iPhone 13',
        brand: 'Apple',
        model: '13',
        basePrice: 699,
        stock: 42,
        imageUrl: 'https://placehold.co/100x100?text=iPhone13',
        variants: []
    }
];

export const initializeData = () => {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(INITIAL_PRODUCTS));
    }
};
