import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Upload, ArrowLeft, Send, Loader2, CheckCircle2 } from 'lucide-react';

const ReferralForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        jobTitle: '',
    });
    const [resumeFile, setResumeFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error('Only PDF files allowed');
            e.target.value = '';
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File must be under 5MB');
            e.target.value = '';
            return;
        }

        setResumeFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name?.trim() || '');
            data.append('email', formData.email?.trim() || '');
            data.append('phone', formData.phone?.trim() || '');
            data.append('jobTitle', formData.jobTitle?.trim() || '');

            if (resumeFile) {
                data.append('resume', resumeFile);
            }

            const response = await api.post('/candidates', data);
            console.debug('Referral POST Response:', response?.data);

            toast.success('Referral added successfully!');

            navigate('/dashboard', { replace: true });
        } catch (err) {
            console.error("Referral submission error:", err);
            const errorMessage = err.response?.data?.message || 'Submission failed';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-10">
                    <Link
                        to="/dashboard"
                        className="group flex items-center text-gray-500 hover:text-gray-900 font-black text-xs tracking-widest transition-all"
                    >
                        <div className="bg-white p-2 rounded-xl shadow-sm mr-3 border border-gray-100 group-hover:-translate-x-1 transition-transform">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        BACK TO DASHBOARD
                    </Link>
                </div>

                <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-100/50 border border-gray-50 overflow-hidden">
                    <div className="p-10 sm:p-14">
                        <div className="mb-12">
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Add Referral</h2>
                            <p className="text-gray-400 font-medium">Submit a new candidate to your pipeline.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+1 234 567 8900"
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Job Title</label>
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        required
                                        value={formData.jobTitle}
                                        onChange={handleInputChange}
                                        placeholder="Software Engineer"
                                        className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] text-gray-900 font-bold focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Resume (PDF)</label>
                                <div className="relative">
                                    <label className={`
                    flex flex-col items-center justify-center w-full h-48 border-4 border-dashed rounded-[2.5rem] cursor-pointer transition-all
                    ${resumeFile ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}
                  `}>
                                        <div className="flex flex-col items-center justify-center p-6 text-center">
                                            {resumeFile ? (
                                                <>
                                                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
                                                    <p className="text-emerald-900 font-black truncate max-w-[250px]">{resumeFile.name}</p>
                                                    <p className="text-emerald-600/60 text-[10px] font-bold mt-1 uppercase tracking-widest">Ready</p>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="bg-white p-3 rounded-2xl shadow-sm mb-3">
                                                        <Upload className="w-6 h-6 text-blue-500" />
                                                    </div>
                                                    <p className="text-gray-900 font-black">Drop PDF here</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Max 5MB</p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-8 h-8 animate-spin" />
                                            SUBMITTING...
                                        </>
                                    ) : (
                                        <>
                                            ADD TO PIPELINE
                                            <Send className="w-6 h-6" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferralForm;
