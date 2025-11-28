import React from 'react';
import { getProducts } from '../services/productService';

const Analytics = () => {
    const handleExport = async (format) => {
        const products = await getProducts();
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `inventory_export_${timestamp}.${format}`;

        let content = '';
        let type = '';

        if (format === 'json') {
            content = JSON.stringify(products, null, 2);
            type = 'application/json';
        } else if (format === 'csv') {
            const headers = ['ID', 'Name', 'Brand', 'Model', 'Price', 'Stock'];
            const rows = products.map(p => [
                p.id,
                `"${p.name}"`, // Quote strings to handle commas
                `"${p.brand}"`,
                `"${p.model}"`,
                p.basePrice,
                p.stock
            ]);
            content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
            type = 'text/csv';
        }

        // Trigger download
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Analytics & Reports</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Power BI Integration Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Power BI Export</h3>
                            <p className="text-sm text-gray-500">Download data to import into Power BI</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm text-gray-600 mb-4">
                            Export your current inventory data to create custom reports and visualizations in Microsoft Power BI.
                        </p>
                        <div className="flex space-x-3">
                            <button onClick={() => handleExport('json')} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium flex justify-center items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                JSON
                            </button>
                            <button onClick={() => handleExport('csv')} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex justify-center items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                CSV
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Overview</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Data Source</span>
                            <span className="font-medium text-gray-900">Local Storage</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Last Sync</span>
                            <span className="font-medium text-gray-900">Just now</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Status</span>
                            <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
