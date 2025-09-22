import AnimatedElement from "./AnimatedElement";

function CTA() {
  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <AnimatedElement>
            <div className="bg-indigo-600 rounded-2xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/50 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                  Ready to Start Your Learning Journey?
                </h2>
                <p className="text-indigo-200 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of students who are achieving their goals with
                  Nucleus. Sign up now and get started.
                </p>
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105">
                  Get Started For Free
                </button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
}

export default CTA;
