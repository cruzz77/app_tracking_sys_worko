import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { UserPlus, Loader2, Sparkles } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [submitting, setSubmitting] = useState(false);
    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const success = await register(formData);
            if (success) navigate('/dashboard', { replace: true });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] px-4">
            <div className="w-full max-w-lg p-12 bg-white rounded-[3rem] shadow-2xl shadow-blue-100/50 border border-gray-50">
                <div className="mb-12 text-center">
                    <div className="bg-emerald-500 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200">
                        <UserPlus className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Get Started</h2>
                    <p className="mt-3 text-emerald-600 font-black tracking-widest uppercase text-[10px] flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3" /> Start Referring Talent
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.25rem] text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none"
                            placeholder="Alexander Wright"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.25rem] text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none"
                            placeholder="alex@work.com"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.25rem] text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 mt-8"
                    >
                        {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "JOIN NETWORK"}
                    </button>
                </form>

                <div className="mt-12 text-center border-t border-gray-50 pt-8">
                    <p className="text-gray-500 font-bold text-sm">
                        Access existing account?{' '}
                        <Link to="/login" className="text-emerald-600 font-black hover:underline uppercase tracking-tighter">
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
