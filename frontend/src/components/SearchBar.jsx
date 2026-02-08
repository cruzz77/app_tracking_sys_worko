import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
    // Handle case where value might be undefined
    const safeValue = value ?? "";

    return (
        <div className="relative w-full max-w-lg group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
                type="text"
                value={safeValue}
                onChange={(e) => onChange?.(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-3xl leading-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all text-sm font-medium"
                placeholder="Search candidates, jobs, or status..."
            />
        </div>
    );
};

export default SearchBar;
