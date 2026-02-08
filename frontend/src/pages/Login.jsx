import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { LogIn, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;

        setSubmitting(true);
        try {
            const success = await login(email, password);
            if (success) navigate('/dashboard', { replace: true });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC] px-4 font-sans">
            <div className="w-full max-w-lg p-12 bg-white rounded-[3rem] shadow-2xl shadow-blue-100/50 border border-gray-50 flex flex-col">
                <div className="mb-12 text-center">
                    <div className="bg-blue-600 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
                        <LogIn className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
                    <p className="mt-3 text-gray-400 font-semibold tracking-wide uppercase text-xs">Access your TalentFlow Dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 flex-grow">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                            placeholder="demo@talentflow.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest pl-2">Security Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-[1.5rem] text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                        {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <>LOGIN <ArrowRight className="w-6 h-6" /></>}
                    </button>
                </form>

                <div className="mt-12 text-center border-t border-gray-50 pt-8">
                    <p className="text-gray-500 font-bold">
                        Don't have an portal?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline decoration-4 underline-offset-4">
                            Create ID
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
