import Question from "./components/Question";
import QuestionProgress from "./components/QuestionProgress";
import './css/Survey.css';

const Survey = () => {
    return (
        <div className="survey-card">
            <QuestionProgress />
            <Question number={1}/>
            <Question number={2}/>
        </div>
    );
}

export default Survey;