import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import StatsCards from '../components/StatsCards';
import SearchBar from '../components/SearchBar';
import CandidateCard from '../components/CandidateCard';
import { Link } from 'react-router-dom';
import { Plus, LogOut, AlertCircle, RefreshCw, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const [candidates, setCandidates] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError('');

            const candidatesRes = await api.get('/candidates');

            console.debug('👥 Candidates Response:', candidatesRes?.data);

            const rawCandidates = candidatesRes?.data;
            let normalizedCandidates = [];

            if (Array.isArray(rawCandidates)) {
                normalizedCandidates = rawCandidates;
            } else if (rawCandidates?.candidates && Array.isArray(rawCandidates.candidates)) {
                normalizedCandidates = rawCandidates.candidates;
            } else if (rawCandidates?.data && Array.isArray(rawCandidates.data)) {
                normalizedCandidates = rawCandidates.data;
            } else {
                normalizedCandidates = [];
            }

            console.debug('Normalized Candidates:', normalizedCandidates);

            setCandidates(normalizedCandidates);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError("Failed to load dashboard data.");
            toast.error("Sync failed");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        console.debug('Dashboard refresh');
        fetchData();
    }, [fetchData, location.pathname, location.key]);

    const stats = useMemo(() => ({
        total: candidates.length,
        pending: candidates.filter(c => c?.status === 'Pending').length,
        reviewed: candidates.filter(c => c?.status === 'Reviewed').length,
        hired: candidates.filter(c => c?.status === 'Hired').length,
    }), [candidates]);

    const handleStatusChange = async (id, newStatus) => {
        if (!id) return;
        try {
            await api.put(`/candidates/${id}/status`, { status: newStatus });
            toast.success("Status updated");
            fetchData();
        } catch {
            toast.error("Status update failed");
        }
    };

    const handleDelete = async (id) => {
        if (!id || !window.confirm("Delete this candidate?")) return;
        try {
            await api.delete(`/candidates/${id}`);
            toast.success("Deleted");
            fetchData();
        } catch {
            toast.error("Delete failed");
        }
    };

    const filteredCandidates = useMemo(() => {
        const term = search.toLowerCase();
        return candidates.filter(c =>
            (c?.name?.toLowerCase()?.includes(term)) ||
            (c?.jobTitle?.toLowerCase()?.includes(term)) ||
            (c?.status?.toLowerCase()?.includes(term))
        );
    }, [candidates, search]);

    if (loading && candidates.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-bold animate-pulse">Loading Pipeline...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tighter">
                            Worko<span className="text-blue-600">AI</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:block text-right border-r border-gray-100 pr-6 mr-6">
                            <p className="text-sm font-black text-gray-900 leading-none mb-1">{user?.name || 'User'}</p>
                            <p className="text-xs font-semibold text-gray-400 leading-none">{user?.email || 'active'}</p>
                        </div>
                        <button
                            onClick={logout}
                            className="group flex items-center text-gray-400 hover:text-red-500 font-black text-xs tracking-widest transition-all"
                        >
                            LOGOUT
                            <LogOut className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {error && (
                    <div className="mb-8 p-4 bg-red-50 border-2 border-red-100 rounded-[2rem] flex items-center gap-4 text-red-700">
                        <AlertCircle className="w-6 h-6 shrink-0" />
                        <p className="font-bold flex-grow">{error}</p>
                        <button onClick={fetchData} className="px-5 py-2 bg-red-600 text-white rounded-2xl font-black text-xs">RETRY</button>
                    </div>
                )}

                <StatsCards stats={stats} />

                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
                    <SearchBar value={search} onChange={setSearch} />
                    <Link
                        to="/referral"
                        className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
                    >
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        NEW REFERRAL
                    </Link>
                </div>

                {filteredCandidates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCandidates.map(candidate => (
                            <CandidateCard
                                key={candidate._id || candidate.id || Math.random()}
                                candidate={candidate}
                                onStatusChange={handleStatusChange}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] border-2 border-dashed border-gray-100 py-32 flex flex-col items-center justify-center text-center px-10">
                        <div className="bg-blue-50/50 p-6 rounded-full mb-6">
                            <Plus className="w-12 h-12 text-blue-200" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">No Candidates Yet</h3>
                        <p className="text-gray-400 max-w-sm font-medium">Add your first referral to start building your pipeline.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
