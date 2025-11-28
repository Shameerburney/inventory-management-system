import { getProducts } from './productService';

export const processMessage = async (message) => {
    const lowerMsg = message.toLowerCase();
    const products = await getProducts();

    // Intent: Check Stock
    if (lowerMsg.includes('stock') || lowerMsg.includes('have') || lowerMsg.includes('available')) {
        // Extract product name (simple heuristic: find matching product name in message)
        const product = products.find(p => lowerMsg.includes(p.name.toLowerCase()) || lowerMsg.includes(p.model.toLowerCase()));

        if (product) {
            if (product.stock > 0) {
                return `We have ${product.stock} units of ${product.name} in stock.`;
            } else {
                return `Sorry, ${product.name} is currently out of stock.`;
            }
        } else {
            // General stock query
            const totalStock = products.reduce((acc, p) => acc + Number(p.stock), 0);
            return `We have a total of ${totalStock} items in stock across all models. You can ask about a specific model like "iPhone 14".`;
        }
    }

    // Intent: Check Price
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
        const product = products.find(p => lowerMsg.includes(p.name.toLowerCase()) || lowerMsg.includes(p.model.toLowerCase()));

        if (product) {
            return `The price for ${product.name} is $${product.basePrice}.`;
        } else {
            return "Which product's price would you like to know?";
        }
    }

    // Intent: Low Stock
    if (lowerMsg.includes('low') || lowerMsg.includes('out of stock')) {
        const lowStock = products.filter(p => Number(p.stock) < 5);
        if (lowStock.length > 0) {
            const names = lowStock.map(p => `${p.name} (${p.stock})`).join(', ');
            return `The following items are running low: ${names}.`;
        } else {
            return "Stock levels are healthy. No items are critically low.";
        }
    }

    // Intent: Help / Greeting
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('help')) {
        return "Hello! I'm your Inventory Assistant. You can ask me about stock levels, prices, or low stock alerts. For example: 'Stock for iPhone 14' or 'Show low stock'.";
    }

    // Default
    return "I didn't quite catch that. Try asking about 'stock', 'price', or 'low stock items'.";
};
