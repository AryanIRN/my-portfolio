import { EDUCATION, PROJECTS, CERTIFICATIONS } from "@/constants";

export const PrintableCV = () => {
    return (
        // De onzichtbare wrapper
        <div className="fixed top-0 left-[-9999px] z-[-50] opacity-0 pointer-events-none flex flex-col gap-10">
            {/* --- PAGINA 1 --- */}
            <div id="cv-page-1" className="w-[210mm] h-[297mm] bg-white text-black p-12 relative overflow-hidden">
                {/* Header */}
                <div className="border-b-2 border-gray-800 pb-4 mb-8">
                    <h1 className="text-5xl font-black uppercase tracking-tighter">Aryan Imanipour</h1>
                    <p className="text-xl font-mono text-blue-600 mt-2 tracking-widest uppercase">Security Analist & Architect</p>
                </div>

                {/* Opleiding Sectie */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold uppercase mb-4 border-b border-gray-300 pb-1">Academische Fundering</h2>
                    {EDUCATION.map((edu, i) => (
                        <div key={i} className="mb-6">
                            <div className="flex justify-between items-end mb-1">
                                <h3 className="text-xl font-bold">{edu.degree} - {edu.specialization}</h3>
                                <span className="font-mono text-sm text-gray-600">{edu.period}</span>
                            </div>
                            <p className="text-blue-600 font-mono text-sm mb-3">{edu.institution}</p>
                            <p className="text-gray-700 text-sm mb-4">{edu.description}</p>

                            <div className="grid grid-cols-2 gap-4">
                                {edu.courses.map((course, idx) => (
                                    <div key={idx}>
                                        <h4 className="font-bold text-sm text-gray-900">{course.name}</h4>
                                        <p className="text-xs text-gray-600">{course.details}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Projecten Sectie */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold uppercase mb-4 border-b border-gray-300 pb-1">Architectuur & Implementaties</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {PROJECTS.map((project, i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-2">{project.title}</h3>
                                <p className="text-xs text-gray-600 mb-3">{project.description}</p>
                                <div className="flex flex-wrap gap-1">
                                    {project.tech.map((t, idx) => (
                                        <span key={idx} className="px-2 py-0.5 bg-gray-200 text-gray-800 text-[10px] font-mono rounded">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Paginanummer onderaan */}
                <div className="absolute bottom-8 right-12 text-sm font-mono text-gray-400">1 / 2</div>
            </div>

            {/* --- PAGINA 2 --- */}
            <div id="cv-page-2" className="w-[210mm] h-[297mm] bg-white text-black p-12 relative overflow-hidden">
                {/* Roadmap & Certificeringen */}
                <div>
                    <h2 className="text-2xl font-bold uppercase mb-6 border-b border-gray-300 pb-1">Certificeringen & Roadmap</h2>
                    <div className="grid grid-cols-1 gap-y-4">
                        {CERTIFICATIONS.map((cert, i) => (
                            <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{cert.name}</h3>
                                    <p className="text-sm text-gray-500 font-mono">{cert.phase}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block font-bold text-blue-600">{cert.date}</span>
                                    <span className="text-xs font-mono text-gray-400">{cert.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Paginanummer onderaan */}
                <div className="absolute bottom-8 right-12 text-sm font-mono text-gray-400">2 / 2</div>
            </div>

        </div>
    );
};