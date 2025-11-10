import {useState, useEffect} from 'react';
import axios from 'axios';
import Question from "./components/Question";
import QuestionProgress from "./components/QuestionProgress";
import './css/Survey.css';
import { LOCALHOST } from './constant';

const Survey = () => {
    const [allQuestions, setAllQuestions] = useState({});

    useEffect(() => {
        const getAllSurveyQuestions = async() => {
            try {
                const surveyQuestionResponse = await axios.get(`${LOCALHOST}/get-questions`);
                console.log(surveyQuestionResponse.data)
                if(surveyQuestionResponse.status == 200) {
                    console.log("Questions received successfully");
                    setAllQuestions(surveyQuestionResponse.data);
                }
            } catch(err) {
                console.error(`Error in getting Survey Questions: ${err}`)
            }
        }

        // TODO: Get the section questions list from the backend. Define an API for that first

        getAllSurveyQuestions();
    }, []);

    console.log(allQuestions);

    return (
        <div className="survey-card">
            <QuestionProgress />
            { Object.keys(allQuestions).length > 0 && 
            <Question number={1} text={allQuestions['gender']['question']}/>
            // <Question number={2} text={allQuestions['age']['question']}/>
            }
        </div>
    );
}

export default Survey;