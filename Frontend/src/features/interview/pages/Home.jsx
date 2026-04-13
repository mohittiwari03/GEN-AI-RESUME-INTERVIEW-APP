import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const { loading, generateReport, reports } = useInterview("");
  const { handleLogout } = useAuth();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    if (data) navigate(`/interview/${data._id}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
  };

  if (loading) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center bg-[#0d1117] text-[#e6edf3]">
        <h1 className="text-2xl font-bold">Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-8 bg-[#0d1117] text-[#e6edf3] font-sans">
      {/* Page Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2 text-[#e6edf3]">
          Create Your Custom{" "}
          <span className="text-[#ff2d78]">Interview Plan</span>
        </h1>
        <p className="text-[#7d8590] text-[0.95rem] max-w-[480px] mx-auto leading-relaxed">
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-[900px] bg-[#161b22] border border-[#2a3348] rounded-2xl overflow-hidden">
        <div className="flex min-h-[520px]">
          {/* Left Panel - Job Description */}
          <div className="relative flex-1 flex flex-col gap-4 p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center text-[#ff2d78]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              <h2 className="text-base font-semibold text-[#e6edf3] flex-1">
                Target Job Description
              </h2>
              <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-[0.3rem] uppercase tracking-wide bg-[#ff2d78]/15 text-[#ff2d78] border border-[#ff2d78]/30">
                Required
              </span>
            </div>
            <textarea
              onChange={(e) => {
                setJobDescription(e.target.value);
              }}
              className="flex-1 w-full bg-[#1e2535] border border-[#2a3348] rounded-lg px-4 py-3 text-[#e6edf3] text-sm font-sans resize-none outline-none leading-relaxed transition-colors duration-200 placeholder:text-[#7d8590] focus:border-[#ff2d78]"
              placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
              maxLength={5000}
            />
            <div className="absolute bottom-9 right-8 text-xs text-[#7d8590]">
              {jobDescription.length} / 5000 chars
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="w-px bg-[#2a3348] shrink-0" />

          {/* Right Panel - Profile */}
          <div className="flex-1 flex flex-col gap-3 p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center text-[#ff2d78]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <h2 className="text-base font-semibold text-[#e6edf3] flex-1">
                Your Profile
              </h2>
            </div>

            {/* Upload Resume
                        <div className='flex flex-col gap-2'>
                            <label className='flex items-center gap-2 text-sm font-medium text-[#e6edf3] mb-1'>
                                Upload Resume
                                <span className='text-[0.7rem] font-semibold px-2 py-0.5 rounded-[0.3rem] uppercase tracking-wide bg-[#ff2d78]/15 text-[#ff2d78] border border-[#ff2d78]/30'>
                                    Best Results
                                </span>
                            </label>

                            <div
                                onClick={() => resumeInputRef.current.click()}
                                className={`flex flex-col items-center justify-center gap-1 px-4 py-6 bg-[#1e2535] border-2 border-dashed rounded-[0.6rem] cursor-pointer transition-colors duration-200 hover:border-[#ff2d78] hover:bg-[#ff2d78]/5 ${fileName ? 'border-[#ff2d78]/50' : 'border-[#2a3348]'}`}>
                                <span className='text-[#ff2d78] mb-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                {fileName
                                    ? <p className='text-sm font-medium text-[#ff2d78] m-0'>✓ {fileName}</p>
                                    : <p className='text-sm font-medium text-[#e6edf3] m-0'>Click to upload or drag &amp; drop</p>
                                }
                                <p className='text-xs text-[#7d8590] m-0'>PDF or DOCX (Max 5MB)</p>
                                <input ref={resumeInputRef} onChange={handleFileChange} className='hidden' type='file' id='resume' name='resume' accept='.pdf,.docx' />
                            </div>
                        </div> */}

            {/* Upload Resume */}
            <div className="upload-section flex flex-col gap-2">
              <label className="section-label flex items-center gap-2 text-sm font-medium text-[#e6edf3] mb-1">
                Upload Resume
                <span className="badge badge--best text-[0.7rem] font-semibold px-2 py-0.5 rounded-[0.3rem] uppercase tracking-wide bg-[#ff2d78]/15 text-[#ff2d78] border border-[#ff2d78]/30">
                  Best Results
                </span>
              </label>
              <label
                onClick={() => resumeInputRef.current.click()}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-6 bg-[#1e2535] border-2 border-dashed rounded-[0.6rem] cursor-pointer transition-colors duration-200 hover:border-[#ff2d78] hover:bg-[#ff2d78]/5 ${fileName ? "border-[#ff2d78]/50" : "border-[#2a3348]"}`}
              >
                <span className="text-[#ff2d78] mb-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                </span>
                {fileName ? (
                  <p className="text-sm font-medium text-[#ff2d78] m-0">
                    ✓ {fileName}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-[#e6edf3] m-0">
                    Click to upload or drag &amp; drop
                  </p>
                )}
                <p className="text-xs text-[#7d8590] m-0">
                  PDF or DOCX (Max 5MB)
                </p>
                <input
                  ref={resumeInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                />
              </label>
            </div>

            {/* OR Divider */}
            <div className='flex items-center gap-3 text-[#7d8590] text-xs before:content-[""] before:flex-1 before:h-px before:bg-[#2a3348] after:content-[""] after:flex-1 after:h-px after:bg-[#2a3348]'>
              <span className="whitespace-nowrap">OR</span>
            </div>

            {/* Quick Self-Description */}
            <div className="flex flex-col gap-2">
              <label
                className="flex items-center gap-2 text-sm font-medium text-[#e6edf3] mb-1"
                htmlFor="selfDescription"
              >
                Quick Self-Description
              </label>
              <textarea
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                }}
                id="selfDescription"
                name="selfDescription"
                className="w-full h-24 bg-[#1e2535] border border-[#2a3348] rounded-lg px-4 py-3 text-[#e6edf3] text-sm font-sans resize-none outline-none leading-relaxed transition-colors duration-200 placeholder:text-[#7d8590] focus:border-[#ff2d78]"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              />
            </div>

            {/* Info Box */}
            <div className="flex items-start gap-2.5 px-4 py-3 bg-[#1b2a4a] border border-[#2d4a7a] rounded-lg">
              <span className="shrink-0 text-[#4a90e2] mt-px">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="12"
                    stroke="#1a1f27"
                    strokeWidth="2"
                  />
                  <line
                    x1="12"
                    y1="16"
                    x2="12.01"
                    y2="16"
                    stroke="#1a1f27"
                    strokeWidth="2"
                  />
                </svg>
              </span>
              <p className="m-0 text-[0.8rem] text-[#8ab4f8] leading-relaxed">
                Either a <strong className="text-[#e6edf3]">Resume</strong> or a{" "}
                <strong className="text-[#e6edf3]">Self Description</strong> is
                required to generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#2a3348]">
          <span className="text-[0.8rem] text-[#7d8590]">
            AI-Powered Strategy Generation &bull; Approx 30s
          </span>
          <button
            onClick={handleGenerateReport}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-br from-[#ff2d78] to-[#cc2460] text-white text-[0.9rem] font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 font-sans hover:opacity-90 active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            Generate My Interview Strategy
          </button>
        </div>
      </div>

      {/* Recent Reports List */}
      {reports.length > 0 && (
        <section className="flex flex-col gap-3 w-full max-w-[900px]">
          <h2 className="text-lg font-semibold text-[#e6edf3]">
            My Recent Interview Plans
          </h2>
          <ul className="flex gap-3 flex-wrap list-none p-0 m-0">
            {reports.map((report) => (
              <li
                key={report._id}
                className="flex-1 min-w-[250px] flex flex-col gap-2 p-4 bg-[#161b22] border border-[#2a3348] rounded-lg cursor-pointer transition-colors duration-200 hover:border-[#ff2d78]/50"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <h3 className="text-sm font-semibold text-[#e6edf3] m-0">
                  {report.title || "Untitled Position"}
                </h3>
                <p className="text-xs text-[#7d8590] m-0">
                  Generated on {new Date(report.createdAt).toLocaleDateString()}
                </p>
                <p
                  className={`text-[0.8rem] font-semibold m-0 ${report.matchScore >= 80 ? "text-green-400" : report.matchScore >= 60 ? "text-yellow-400" : "text-[#ff2d78]"}`}
                >
                  Match Score: {report.matchScore}%
                </p>
              </li>
            ))}
          </ul>
          <button
            onClick={async () => {
              await handleLogout();
              navigate("/login");
            }}
            className="px-6 py-3 w-2/8 mx-auto bg-linear-to-br from-[#ff2d78] to-[#cc2460] text-white text-[0.9rem] font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 font-sans hover:opacity-90 active:scale-[0.98]"
          >
            Logout
          </button>
        </section>
      )}

      {/* Page Footer */}
      <footer className="flex gap-6">
        <a
          href="#"
          className="text-[0.8rem] text-[#7d8590] no-underline transition-colors duration-200 hover:text-[#e6edf3]"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-[0.8rem] text-[#7d8590] no-underline transition-colors duration-200 hover:text-[#e6edf3]"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="text-[0.8rem] text-[#7d8590] no-underline transition-colors duration-200 hover:text-[#e6edf3]"
        >
          Help Center
        </a>
      </footer>
    </div>
  );
};

export default Home;
