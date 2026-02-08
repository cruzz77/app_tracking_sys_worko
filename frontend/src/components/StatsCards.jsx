import React from 'react';
import { Users, Clock, CheckCircle, Briefcase } from 'lucide-react';

const StatCard = ({ title, count, icon: Icon, color }) => {
    // Ultra-safe count fallback
    const displayCount = count ?? 0;

    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center transition-all hover:shadow-md">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 mr-5`}>
                {Icon && <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />}
            </div>
            <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{title}</p>
                <h3 className="text-3xl font-black text-gray-900 leading-tight">
                    {typeof displayCount === 'number' ? displayCount.toLocaleString() : displayCount}
                </h3>
            </div>
        </div>
    );
};

const StatsCards = ({ stats }) => {
    // Extreme safety check
    const safeStats = stats || {};

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard
                title="Total"
                count={safeStats?.total ?? 0}
                icon={Users}
                color="bg-blue-600"
            />
            <StatCard
                title="Pending"
                count={safeStats?.pending ?? 0}
                icon={Clock}
                color="bg-amber-500"
            />
            <StatCard
                title="Reviewed"
                count={safeStats?.reviewed ?? 0}
                icon={CheckCircle}
                color="bg-indigo-500"
            />
            <StatCard
                title="Hired"
                count={safeStats?.hired ?? 0}
                icon={Briefcase}
                color="bg-emerald-500"
            />
        </div>
    );
};

export default StatsCards;
