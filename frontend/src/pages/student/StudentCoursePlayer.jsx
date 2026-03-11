import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ChevronLeft,
  Video,
  Clock,
  Maximize,
  PanelRightOpen,
  PanelRightClose,
  CheckCircle2,
  PlayCircle,
  Award,
  MessageSquare,
  Send,
} from "lucide-react";

import { useCourseStore } from "../../store/useCourseStore";
import Loader from "../../components/Loader";

const StudentCoursePlayer = () => {
  const { courseId } = useParams();
  const videoContainerRef = useRef(null);

  const {
    fetchCourseContents,
    contents,
    course,
    fetchCourseById,
    isLoading,
    activeLecture,
    setActiveLecture,
    fetchMyProgress,
    userProgress,
    updateLessonProgress,
    issueCertificate,
    isIssuingCertificate,
  } = useCourseStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' or 'discussion'

  const isCourseFinished = userProgress?.completedPercentage >= 100;

  useEffect(() => {
    fetchCourseById(courseId);
    fetchCourseContents(courseId);
    fetchMyProgress(courseId);
  }, [courseId, fetchCourseById, fetchCourseContents, fetchMyProgress]);

  const isCompleted = (contentId) => {
    return userProgress?.completedContents?.some(
      (item) => item.content === contentId,
    );
  };

  const handleClaimCertificate = async () => {
    const result = await issueCertificate(courseId);
    if (result) fetchMyProgress(courseId);
  };

  const handleMarkAsCompleted = async () => {
    if (activeLecture && !isCompleted(activeLecture._id)) {
      await updateLessonProgress(courseId, activeLecture._id);
      fetchMyProgress(courseId);
      const currentIndex = contents.findIndex(
        (l) => l._id === activeLecture._id,
      );
      if (currentIndex < contents.length - 1)
        setActiveLecture(contents[currentIndex + 1]);
    }
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement)
      videoContainerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  if (isLoading || !course) return <Loader />;

  return (
    <div className="h-screen flex flex-col bg-[#f8fafc] text-slate-900 overflow-hidden rounded-md">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { width: 5px; }
        .no-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .no-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>

      {/* --- REFINED NAV --- */}
      <nav className="h-14 border-b border-slate-200 flex items-center justify-between px-6 bg-white z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            to="/student/my-courses"
            className="p-2 hover:bg-slate-100 rounded-full transition text-slate-500"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-slate-200" />
          <h1 className="text-sm font-bold text-slate-700 truncate max-w-[300px]">
            {course.title}
          </h1>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
        >
          {isSidebarOpen ? (
            <PanelRightClose size={20} />
          ) : (
            <PanelRightOpen size={20} />
          )}
        </button>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar bg-white">
          {/* CELEBRATION NOTIFICATION */}
          <AnimatePresence>
            {isCourseFinished && !userProgress?.certificateIssued && (
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className="bg-indigo-600 text-white px-6 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Award size={18} className="text-yellow-300 animate-pulse" />
                  Congratulations! You've mastered this course.
                </div>
                <button
                  onClick={handleClaimCertificate}
                  disabled={isIssuingCertificate}
                  className="bg-white text-indigo-600 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-indigo-50 transition-all"
                >
                  {isIssuingCertificate ? "Issuing..." : "Claim Certificate"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* THEATRE PLAYER SECTION */}
          <div
            ref={videoContainerRef}
            className="relative aspect-video bg-black w-full group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLecture?._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full"
              >
                {activeLecture?.type === "video" ? (
                  <video
                    key={activeLecture.contentUrl}
                    src={activeLecture.contentUrl}
                    controls
                    controlsList="nodownload"
                    className="w-full h-full"
                    onEnded={handleMarkAsCompleted}
                    autoPlay
                  />
                ) : (
                  <iframe
                    src={activeLecture?.contentUrl}
                    className="w-full h-full bg-white"
                    title="Viewer"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <button
              onClick={toggleFullscreen}
              className="absolute bottom-16 right-4 p-2 bg-black/40 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Maximize size={18} />
            </button>
          </div>

          {/* CONTENT & INTERACTION AREA */}
          <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  {activeLecture?.title}
                </h2>
                <div className="flex items-center gap-3 text-xs font-bold uppercase text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {activeLecture?.duration || "10m"}
                  </span>
                  <span>•</span>
                  <span className="text-indigo-500 tracking-widest">
                    {activeLecture?.type}
                  </span>
                </div>
              </div>

              <button
                onClick={handleMarkAsCompleted}
                disabled={isCompleted(activeLecture?._id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${isCompleted(activeLecture?._id) ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-900 text-white hover:bg-slate-800 shadow-md"}`}
              >
                {isCompleted(activeLecture?._id) ? (
                  <>
                    <CheckCircle2 size={16} /> Completed
                  </>
                ) : (
                  "Mark as Finished"
                )}
              </button>
            </div>

            {/* TAB SYSTEM */}
            <div className="flex gap-8 border-b border-slate-100 mb-8">
              {["overview", "discussion"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold capitalize transition-all relative cursor-pointer ${activeTab === tab ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                    />
                  )}
                </button>
              ))}
            </div>

            {activeTab === "overview" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {activeLecture?.description}
                  </p>
                </div>

                {/* CERTIFICATE STATUS INTEGRATED */}
                {userProgress?.certificateIssued && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center gap-5 shadow-sm">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        Certificate Issued
                      </h4>
                      <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wider">
                        A copy was sent to your email
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Ask a question about this lesson..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium outline-none"
                  />
                  <button className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer">
                    <Send size={18} />
                  </button>
                </div>
                <div className="py-10 text-center text-slate-400 space-y-2">
                  <MessageSquare size={40} className="mx-auto opacity-20" />
                  <p className="text-sm font-medium">
                    No discussions yet. Be the first to ask!
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </main>

        {/* --- REFINED SIDEBAR --- */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: 380 }}
              exit={{ width: 0 }}
              className="border-l border-slate-200 bg-white flex flex-col z-10"
            >
              <div className="p-6 border-b border-slate-50">
                <h2 className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 mb-4">
                  Course Content
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-400">
                      YOUR PROGRESS
                    </span>
                    <span className="text-xs font-black text-indigo-600">
                      {Math.round(userProgress?.completedPercentage || 0)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${userProgress?.completedPercentage || 0}%`,
                      }}
                      className="bg-indigo-600 h-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar py-2">
                {contents.map((lecture, index) => {
                  const isActive = activeLecture?._id === lecture._id;
                  const done = isCompleted(lecture._id);
                  return (
                    <button
                      key={lecture._id}
                      onClick={() => setActiveLecture(lecture)}
                      className={`group w-full text-left px-6 py-5 flex items-start gap-4 transition-all border-b border-slate-50/50 ${isActive ? "bg-indigo-50/40" : "hover:bg-slate-50"}`}
                    >
                      <div
                        className={`mt-1 h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${isActive ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : done ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"}`}
                      >
                        {done ? (
                          <CheckCircle2 size={16} />
                        ) : isActive ? (
                          <PlayCircle size={16} />
                        ) : lecture.type === "video" ? (
                          <Video size={16} />
                        ) : (
                          <FileText size={16} />
                        )}
                      </div>
                      <div className="flex flex-col flex-1 truncate">
                        <span
                          className={`text-sm font-bold transition-colors truncate ${isActive ? "text-indigo-600" : done ? "text-slate-500" : "text-slate-600"}`}
                        >
                          {index + 1}. {lecture.title}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                          {lecture.type}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentCoursePlayer;
