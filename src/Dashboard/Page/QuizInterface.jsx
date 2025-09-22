import { useState, useEffect } from "react";
import DashboardHeader from "../Components/DashboardHeader";
import {
  getQuizByTopicAPI,
  getQuizTopicsAPI,
  submitQuizAPI,
} from "../../operation/service/PlaygroundService";
import QuizSelect from "../Quiz/QuizSelect";
import QuizSkelton from "../Quiz/QuizSkelton";
import QuizTaking from "../Quiz/QuizTaking";
import QuizResult from "../Quiz/QuizResult";
import useAuthContext from "../../customhooks/useAuthContext";

function QuizInterface() {
  const [status, setStatus] = useState("selecting");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [quizTopic, setQuizTopic] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [token] = useAuthContext();
  const [quizId, setQuizId] = useState(null);
  const [attemptId, setAttemptId] = useState(null);

  async function getQuizTopics() {
    try {
      const response = await getQuizTopicsAPI();
      if (response.status === 200) {
        setQuizTopic(response.data);
      }
    } catch (error) {
      console.error("Error fetching quiz topics:", error);
    }
  }

  useEffect(() => {
    getQuizTopics();
  }, []);

  const handleTopicChange = (topicName, topicId) => {
    setSelectedTopic(topicName);
    setSelectedTopicId(topicId);
  };

  const handleStartQuiz = async () => {
    setStatus("loading");
    try {
      const quizQuestionResponse = await getQuizByTopicAPI(
        selectedTopicId,
        token
      );
      console.log("Quiz Question Response:", quizQuestionResponse);
      if (quizQuestionResponse.status === 200) {
        setQuizData(quizQuestionResponse.data.questions);
        setQuizId(quizQuestionResponse.data.quizId);
        setAttemptId(quizQuestionResponse.data.attemptId);
        setStatus("taking");
        setUserAnswers({});
        setCurrentQuestionIndex(0);
      }
    } catch (error) {
      setStatus("selecting");
      console.error("Error fetching quiz:", error);
    }
  };

  const handleAnswerSelect = (questionId, answer, key) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitQuiz = async () => {
    setStatus("submitting");
    console.log("userAnswers:", userAnswers);

    try {
      const response = await submitQuizAPI(
        userAnswers,
        token,
        quizId,
        attemptId
      );
      if (response.status === 200) {
        setResults(response.data);
        setStatus("results");
      }
    } catch (error) {
      setStatus("taking");
      console.error("Error submitting quiz:", error);
    }
  };

  const handleTryAgain = () => {
    setStatus("selecting");
    setQuizData(null);
    setResults(null);
  };

  const renderContent = () => {
    switch (status) {
      case "selecting":
        return (
          <QuizSelect
            selectedTopic={selectedTopic}
            setSelectedTopic={handleTopicChange}
            onStart={handleStartQuiz}
            quizTopics={quizTopic}
          />
        );
      case "loading":
      case "submitting":
        return <QuizSkelton />;
      case "taking":
        return (
          <QuizTaking
            quizData={quizData}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            userAnswers={userAnswers}
            onAnswerSelect={handleAnswerSelect}
            onSubmit={handleSubmitQuiz}
          />
        );
      case "results":
        return <QuizResult results={results} onTryAgain={handleTryAgain} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <DashboardHeader title="Quiz" />
      <div className="mt-8">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default QuizInterface;
