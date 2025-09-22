import Navbar from "../components/common/Navbar";
import CodeEditor from "../components/PlayGround/CodeEditor/CodeEditor";

function PlaygroundPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 mt-[4rem]">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Learning Playground
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Test your knowledge or experiment with code.
          </p>
        </div>
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default PlaygroundPage;
