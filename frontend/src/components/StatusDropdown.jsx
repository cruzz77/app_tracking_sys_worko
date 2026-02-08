import { ChevronDown } from 'lucide-react';

const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Reviewed: 'bg-purple-100 text-purple-800 border-purple-200',
    Hired: 'bg-green-100 text-green-800 border-green-200',
};

const StatusDropdown = ({ status, onChange }) => {
    return (
        <div className="relative inline-block w-40">
            <select
                value={status}
                onChange={(e) => onChange(e.target.value)}
                className={`appearance-none block w-full px-4 py-2 pr-8 rounded-full text-sm font-semibold border ${statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer`}
            >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Hired">Hired</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
    );
};

export default StatusDropdown;
