import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalStock: 0,
        lowStockCount: 0,
        totalValue: 0,
        topBrand: 'N/A'
    });
    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getProducts();

                // Calculate stats
                const totalStock = products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);
                const lowStockItems = products.filter(p => (Number(p.stock) || 0) < 5);
                const totalValue = products.reduce((acc, p) => acc + ((Number(p.basePrice) || 0) * (Number(p.stock) || 0)), 0);

                // Find top brand
                const brandCounts = {};
                products.forEach(p => {
                    const brand = p.brand || 'Unknown';
                    brandCounts[brand] = (brandCounts[brand] || 0) + 1;
                });
                const topBrand = Object.keys(brandCounts).reduce((a, b) => brandCounts[a] > brandCounts[b] ? a : b, 'N/A');

                setStats({
                    totalStock,
                    lowStockCount: lowStockItems.length,
                    totalValue,
                    topBrand
                });
                setRecentProducts(products.slice(0, 5));
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="p-10 text-xl">Loading...</div>;
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* Simple Grid - No SVGs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="text-blue-600 font-semibold uppercase text-sm">Total Stock</div>
                    <div className="text-4xl font-bold text-gray-900 mt-2">{stats.totalStock}</div>
                </div>

                <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                    <div className="text-red-600 font-semibold uppercase text-sm">Low Stock</div>
                    <div className="text-4xl font-bold text-gray-900 mt-2">{stats.lowStockCount}</div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <div className="text-green-600 font-semibold uppercase text-sm">Total Value</div>
                    <div className="text-4xl font-bold text-gray-900 mt-2">${(stats.totalValue / 1000).toFixed(1)}k</div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <div className="text-purple-600 font-semibold uppercase text-sm">Top Brand</div>
                    <div className="text-4xl font-bold text-gray-900 mt-2">{stats.topBrand}</div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="font-bold text-gray-800">Recent Inventory</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Brand</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Stock</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {recentProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{product.name}</td>
                                <td className="px-6 py-4 text-gray-500">{product.brand}</td>
                                <td className="px-6 py-4 text-gray-900">${product.basePrice}</td>
                                <td className="px-6 py-4 text-gray-500">{product.stock}</td>
                                <td className="px-6 py-4">
                                    {Number(product.stock) === 0 ? (
                                        <span className="text-red-600 font-bold text-sm">Out of Stock</span>
                                    ) : Number(product.stock) < 5 ? (
                                        <span className="text-yellow-600 font-bold text-sm">Low Stock</span>
                                    ) : (
                                        <span className="text-green-600 font-bold text-sm">In Stock</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
