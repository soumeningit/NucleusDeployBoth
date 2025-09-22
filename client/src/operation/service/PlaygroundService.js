import { playgroundEndpoints } from "../API"
import { apiConnector } from "../service/apiConnector";

const {
    GET_QUIZ_TOPICS_API,
    GET_QUIZ_BY_TOPIC_API,
    EVALUATE_QUIZ_RESPONSE_API
} = playgroundEndpoints;

export const getQuizTopicsAPI = async () => {
    try {
        const response = await apiConnector("GET", GET_QUIZ_TOPICS_API);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getQuizByTopicAPI = async (topicId, token) => {
    try {
        const response = await apiConnector("GET", `${GET_QUIZ_BY_TOPIC_API}?topicId=${topicId}`, null, {
            Authorization: `Bearer ${token}`
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const submitQuizAPI = async (userAnswers, token, quizId, attemptId) => {
    try {
        const response = await apiConnector("POST", EVALUATE_QUIZ_RESPONSE_API, { userAnswers, quizId, attemptId }, {
            Authorization: `Bearer ${token}`
        });
        return response;
    } catch (error) {
        throw error;
    }
}
