import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate, useParams } from 'react-router'



const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='bg-[#1c2230] border border-[#2a3348] rounded-[0.6rem] overflow-hidden transition-colors duration-200 hover:border-[#3d4a60]'>
            <div
                className='flex items-start gap-3 px-4 py-[0.9rem] cursor-pointer select-none'
                onClick={() => setOpen(o => !o)}
            >
                <span className='shrink-0 text-[0.7rem] font-bold text-[#ff2d78] bg-[#ff2d78]/10 border border-[#ff2d78]/20 rounded-[0.3rem] px-[0.4rem] py-[0.15rem] mt-[2px]'>
                    Q{index + 1}
                </span>
                <p className='flex-1 m-0 text-[0.9rem] font-medium text-[#e6edf3] leading-relaxed'>
                    {item.question}
                </p>
                <span className={`shrink-0 text-[#7d8590] mt-[2px] transition-transform duration-200 ${open ? 'rotate-180 text-[#ff2d78]' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='px-4 pb-4 flex flex-col gap-3 border-t border-[#2a3348] pt-3'>
                    <div className='flex flex-col gap-[0.4rem]'>
                        <span className='text-[0.68rem] font-bold uppercase tracking-wide w-fit px-2 py-[0.15rem] rounded-sm text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/20'>
                            Intention
                        </span>
                        <p className='m-0 text-[0.835rem] text-[#a0a8b4] leading-relaxed'>{item.intention}</p>
                    </div>
                    <div className='flex flex-col gap-[0.4rem]'>
                        <span className='text-[0.68rem] font-bold uppercase tracking-wide w-fit px-2 py-[0.15rem] rounded-sm text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/20'>
                            Model Answer
                        </span>
                        <p className='m-0 text-[0.835rem] text-[#a0a8b4] leading-relaxed'>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='flex flex-col gap-2 py-3 pl-14 relative
        before:content-[""] before:absolute before:left-[21px] before:top-[1.05rem] before:w-[14px] before:h-[14px] before:rounded-full before:bg-[#161b22] before:border-2 before:border-[#ff2d78]'>
        <div className='flex items-center gap-[0.6rem]'>
            <span className='text-[0.7rem] font-bold text-[#ff2d78] bg-[#ff2d78]/10 border border-[#ff2d78]/25 px-2 py-[0.1rem] rounded-full'>
                Day {day.day}
            </span>
            <h3 className='m-0 text-[0.95rem] font-semibold text-[#e6edf3]'>{day.focus}</h3>
        </div>
        <ul className='list-none m-0 p-0 flex flex-col gap-[0.35rem]'>
            {day.tasks.map((task, i) => (
                <li key={i} className='flex items-start gap-2 text-[0.845rem] text-[#96a0ad] leading-relaxed'>
                    <span className='shrink-0 w-[5px] h-[5px] rounded-full bg-[#7d8590] mt-[8px]' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])



    if (loading || !report) {
        return (
            <main className='w-full min-h-screen flex items-center justify-center bg-[#0d1117] text-[#e6edf3]'>
                <h1 className='text-2xl font-bold'>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'border-[#3fb950]' :
            report.matchScore >= 60 ? 'border-[#f5a623]' : 'border-[#ff4d4d]'

    const scoreTextColor =
        report.matchScore >= 80 ? 'text-[#3fb950]' :
            report.matchScore >= 60 ? 'text-[#f5a623]' : 'text-[#ff4d4d]'

    return (
        <div className='w-full min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans flex items-stretch p-6 box-border [&::-webkit-scrollbar]:hidden'>
            <div className='flex w-full max-w-[1280px] mx-auto bg-[#161b22] border border-[#2a3348] rounded-2xl justify-between'>

                {/* ── Left Nav ── */}
                <nav className='w-[220px] shrink-0 py-7 px-4 flex flex-col justify-between gap-1'>
                    <div>
                        <p className='text-[0.7rem] font-semibold uppercase tracking-wider text-[#7d8590] px-3 mb-2'>
                            Sections
                        </p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`flex items-center gap-[0.6rem] w-full px-3 py-[0.65rem] bg-transparent border-none rounded-lg text-[0.875rem] cursor-pointer text-left transition-colors duration-150 font-sans
                                    ${activeNav === item.id
                                        ? 'bg-[#ff2d78]/10 text-[#ff2d78] [&_svg]:stroke-[#ff2d78]'
                                        : 'text-[#7d8590] hover:bg-[#1c2230] hover:text-[#e6edf3]'
                                    }`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='flex items-center shrink-0'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => { getResumePdf(interviewId) }}
                        className='flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-br from-[#ff2d78] to-[#cc2460] text-white text-[0.85rem] font-semibold border-none rounded-lg cursor-pointer transition-all duration-200 font-sans hover:opacity-90 active:scale-[0.98]'>
                        <svg height={"0.8rem"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>
                </nav>

                {/* Divider */}
                <div className='w-px bg-[#2a3348] shrink-0' />

                {/* ── Center Content ── */}
                <main className='flex-1 py-7 px-8 overflow-y-auto max-h-[calc(100vh-3rem)] pb-20 [&::-webkit-scrollbar]:hidden'>
                    {activeNav === 'technical' && (
                        <section className='min-h-full'>
                            <div className='flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]'>
                                <h2 className='text-[1.1rem] font-bold text-[#e6edf3] m-0'>Technical Questions</h2>
                                <span className='text-[0.8rem] text-[#7d8590] bg-[#1c2230] px-[0.6rem] py-[0.15rem] rounded-full border border-[#2a3348]'>
                                    {report.technicalQuestions.length} questions
                                </span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section className='min-h-full'>
                            <div className='flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]'>
                                <h2 className='text-[1.1rem] font-bold text-[#e6edf3] m-0'>Behavioral Questions</h2>
                                <span className='text-[0.8rem] text-[#7d8590] bg-[#1c2230] px-[0.6rem] py-[0.15rem] rounded-full border border-[#2a3348]'>
                                    {report.behavioralQuestions.length} questions
                                </span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section className='min-h-full'>
                            <div className='flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]'>
                                <h2 className='text-[1.1rem] font-bold text-[#e6edf3] m-0'>Preparation Road Map</h2>
                                <span className='text-[0.8rem] text-[#7d8590] bg-[#1c2230] px-[0.6rem] py-[0.15rem] rounded-full border border-[#2a3348]'>
                                    {report.preparationPlan.length}-day plan
                                </span>
                            </div>
                            {/* Timeline container with vertical line */}
                            <div className='flex flex-col relative
                                before:content-[""] before:absolute before:left-[28px] before:top-0 before:bottom-0 before:w-[2px] before:bg-linear-to-b before:from-[#ff2d78] before:to-[#ff2d78]/10 before:rounded-sm'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Divider */}
                <div className='w-px bg-[#2a3348] shrink-0' />

                {/* ── Right Sidebar ── */}
                <aside className='w-[240px] shrink-0 py-7 px-5 flex flex-col gap-5'>

                    {/* Match Score */}
                    <div className='flex flex-col items-center gap-[0.6rem]'>
                        <p className='text-[0.75rem] font-semibold uppercase tracking-wider text-[#7d8590] m-0 self-start'>
                            Match Score
                        </p>
                        <div className={`w-[90px] h-[90px] rounded-full flex flex-col items-center justify-center border-4 ${scoreColor}`}>
                            <span className='text-[1.6rem] font-extrabold text-[#e6edf3] leading-none'>{report.matchScore}</span>
                            <span className='text-[0.75rem] text-[#7d8590] -mt-[2px]'>%</span>
                        </div>
                        <p className={`m-0 text-[0.75rem] text-center ${scoreTextColor}`}>
                            {report.matchScore >= 80 ? 'Strong match for this role' :
                             report.matchScore >= 60 ? 'Moderate match' : 'Needs improvement'}
                        </p>
                    </div>

                    {/* Sidebar Divider */}
                    <div className='h-px bg-[#2a3348]' />

                    {/* Skill Gaps */}
                    <div className='flex flex-col gap-3'>
                        <p className='text-[0.75rem] font-semibold uppercase tracking-wider text-[#7d8590] m-0'>
                            Skill Gaps
                        </p>
                        <div className='flex flex-wrap gap-2'>
                            {report.skillGaps.map((gap, i) => (
                                <span
                                    key={i}
                                    className={`text-[0.775rem] font-medium px-[0.7rem] py-[0.3rem] rounded-[0.4rem] border cursor-default
                                        ${gap.severity === 'high'
                                            ? 'text-[#ff4d4d] bg-[#ff4d4d]/10 border-[#ff4d4d]/25'
                                            : gap.severity === 'medium'
                                                ? 'text-[#f5a623] bg-[#f5a623]/10 border-[#f5a623]/25'
                                                : 'text-[#3fb950] bg-[#3fb950]/10 border-[#3fb950]/25'
                                        }`}
                                >
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview