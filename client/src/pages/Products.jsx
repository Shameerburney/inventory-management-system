import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import ProductForm from '../components/ProductForm';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
            setError('');
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Failed to load products. Make sure backend is running on port 8000.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setCurrentProduct(null);
        setIsEditing(true);
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (err) {
                console.error('Error deleting product:', err);
                alert('Failed to delete product');
            }
        }
    };

    const handleSave = async (productData) => {
        try {
            setLoading(true);
            if (currentProduct) {
                await updateProduct(currentProduct.id, productData);
            } else {
                await addProduct(productData);
            }
            setIsEditing(false);
            fetchProducts();
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Failed to save product: ' + (err.response?.data?.detail || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Product Management</h2>
                {!isEditing && (
                    <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Add Product
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                    <p className="text-red-600 text-xs mt-1">Check console (F12) for details</p>
                </div>
            )}

            {loading && <div className="text-center py-8">Loading...</div>}

            {isEditing ? (
                <ProductForm product={currentProduct} onSave={handleSave} onCancel={() => setIsEditing(false)} />
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Name</th>
                                    <th className="px-6 py-3 font-medium">Brand</th>
                                    <th className="px-6 py-3 font-medium">Model</th>
                                    <th className="px-6 py-3 font-medium">Price</th>
                                    <th className="px-6 py-3 font-medium">Stock</th>
                                    <th className="px-6 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{product.brand}</td>
                                        <td className="px-6 py-4 text-gray-500">{product.model}</td>
                                        <td className="px-6 py-4 text-gray-500">${product.base_price || product.basePrice}</td>
                                        <td className="px-6 py-4 text-gray-500">{product.stock}</td>
                                        <td className="px-6 py-4 flex space-x-3">
                                            <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800">Edit</button>
                                            <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No products found. Add one to get started.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
