import React from 'react';
import {
  FileText,
  Trash2,
  Mail,
  Phone,
  Briefcase,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

const statusConfigs = {
  Pending: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
  Reviewed: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' },
  Hired: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
};

const API_BASE = import.meta.env.VITE_API_URL.replace('/api', '')


const CandidateCard = ({ candidate, onStatusChange, onDelete }) => {
  if (!candidate) return null;

  const id = candidate._id || candidate.id;
  const status = candidate.status || 'Pending';
  const config = statusConfigs[status] || statusConfigs.Pending;

  const resumeUrl = candidate.resume
    ? `${API_BASE}/uploads/${candidate.resume}`
    : null;

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 group">
      <div className="p-8 flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div className="max-w-[70%]">
            <h3 className="text-xl font-extrabold text-gray-900 truncate mb-1">
              {candidate.name || 'Anonymous Candidate'}
            </h3>

            <div className="flex items-center text-gray-500 text-sm font-semibold">
              <Briefcase className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
              <span className="truncate">
                {candidate.jobTitle || 'No Title Specified'}
              </span>
            </div>
          </div>

          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatusChange?.(id, e.target.value)}
              className={`appearance-none pl-4 pr-10 py-2 rounded-2xl text-xs font-black border-2 cursor-pointer transition-all ${config.bg} ${config.text} ${config.border}`}
            >
              {Object.keys(statusConfigs).map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>

            <ChevronDown
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${config.text} pointer-events-none`}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-100/50">
            <Mail className="w-4 h-4 mr-3 text-blue-500 shrink-0" />
            <span className="text-sm font-bold truncate">
              {candidate.email || 'No Email'}
            </span>
          </div>

          <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-100/50">
            <Phone className="w-4 h-4 mr-3 text-emerald-500 shrink-0" />
            <span className="text-sm font-bold">
              {candidate.phone || 'No Phone'}
            </span>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div className="bg-gray-50/50 px-8 py-5 flex justify-between items-center border-t border-gray-100">
        {resumeUrl ? (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-black transition-colors"
          >
            <FileText className="w-5 h-5 mr-2" />
            VIEW RESUME
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        ) : (
          <span className="text-gray-400 text-xs font-bold flex items-center italic">
            <FileText className="w-5 h-5 mr-2 opacity-50" />
            NO UPLOAD
          </span>
        )}

        <button
          onClick={() => onDelete?.(id)}
          className="bg-white text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-2xl border border-gray-200 transition-all hover:border-red-500 shadow-sm"
          title="Delete Candidate"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
