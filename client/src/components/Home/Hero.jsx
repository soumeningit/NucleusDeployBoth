import {
  FaPlay,
  FaCheckCircle,
  FaRegDotCircle,
  FaLock,
  FaRocket,
  FaAward,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            The Center of Your Learning Universe
          </h2>
          <p
            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Nucleus provides a dynamic and engaging platform to master new
            skills and advance your career. Learn from the best, at your own
            pace.
          </p>
          <div
            className="flex justify-center items-center gap-4 flex-wrap animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              onClick={() => navigate("/courses")}
              className="cursor-pointer bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Explore Courses
            </button>
          </div>
        </div>

        {/* --- NEW & IMPROVED VISUAL SECTION --- */}
        <div
          className="mt-20 relative animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div className="absolute inset-0 bg-indigo-100/50 rounded-full blur-3xl opacity-40"></div>

          {/* Dashboard Mockup */}
          <div className="relative bg-white p-4 sm:p-5 rounded-2xl shadow-2xl max-w-4xl mx-auto z-10 border border-gray-100">
            {/* Window Header */}
            <div className="flex items-center pb-3 border-b border-gray-200/80">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <p className="ml-4 text-xs sm:text-sm font-medium text-gray-500 flex-grow text-center">
                My Dashboard - Nucleus
              </p>
            </div>

            {/* Dashboard Body */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              {/* Main Content - Video Player Mock */}
              <div
                className="flex-grow bg-gray-900 rounded-lg aspect-video flex items-center justify-center p-4"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #1f2937 25%, transparent 25%), linear-gradient(-45deg, #1f2937 25%, transparent 25%)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white/30 transition-colors">
                  <FaPlay className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" />
                </div>
              </div>

              {/* Sidebar - Course Modules */}
              <div className="md:w-[280px] flex-shrink-0 bg-gray-50/80 p-3 sm:p-4 rounded-lg border border-gray-200/50">
                <h4 className="font-bold text-gray-700 mb-3 text-sm">
                  Course Modules
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center p-2 bg-indigo-100 rounded-md">
                    <FaCheckCircle
                      size={18}
                      className="text-indigo-600 mr-2 flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">
                      1. Introduction to AI
                    </span>
                  </div>
                  <div className="flex items-center p-2 bg-white rounded-md border border-gray-200/80">
                    <FaRegDotCircle
                      size={18}
                      className="text-indigo-600 mr-2 flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-gray-600 truncate">
                      2. Core Concepts
                    </span>
                  </div>
                  <div className="flex items-center p-2 bg-white rounded-md border border-gray-200/80 opacity-60">
                    <FaLock
                      size={18}
                      className="text-gray-400 mr-2 flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-gray-500 truncate">
                      3. Advanced Topics
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div
            className="absolute -top-8 -left-8 z-20 bg-white p-3 rounded-lg shadow-lg hidden lg:flex items-center animate-float"
            style={{ animationDelay: "1.2s" }}
          >
            <FaRocket size={20} className="text-green-500 mr-2" />
            <p className="text-sm font-semibold text-gray-700">Career Growth</p>
          </div>
          <div
            className="absolute -bottom-8 -right-8 z-20 bg-white p-3 rounded-lg shadow-lg hidden lg:flex items-center animate-float"
            style={{ animationDelay: "1.4s" }}
          >
            <FaAward size={20} className="text-yellow-500 mr-2" />
            <p className="text-sm font-semibold text-gray-700">Get Certified</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
