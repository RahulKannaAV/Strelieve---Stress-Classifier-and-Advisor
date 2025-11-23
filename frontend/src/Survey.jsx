import {useState, useEffect} from 'react';
import axios from 'axios';
import Question from "./components/Question";
import QuestionProgress from "./components/QuestionProgress";
import './css/Survey.css';
import WaitModal from './components/WaitModal';
import { LOCALHOST } from './constant';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Survey = () => {
    const [allQuestions, setAllQuestions] = useState({});
    const [allResponses, setResponses] = useState({});
    const [anyEmptyResponse, setEmptyResponse] = useState(false);
    const [currentSection, setCurrentSection] = useState("");
    const [keyObj, setKeyObj] = useState({});
    const [submit, setSubmit] = useState(false);
    const [sectionKeys, setSectionKeys] = useState([]);
    const [modalStatus, openModal] = useState({
        status: false,
        message: "Please wait"
    });

    useEffect(() => {
        const getAllSurveyQuestions = async() => {
            try {
                const surveyQuestionResponse = await axios.get(`${LOCALHOST}/get-questions`);
                console.log(surveyQuestionResponse.data)
                if(surveyQuestionResponse.status == 200) {
                    console.log("Questions received successfully");
                    setAllQuestions(surveyQuestionResponse.data);
                    let dummyObj = {};
                    let keyDummyObj = {};
                    let i = 0;
                    for(let key of Object.keys(surveyQuestionResponse.data)) {
                        dummyObj[key] = "";
                        keyDummyObj[key] = i;
                        i++;
                    }
                    setResponses(dummyObj);
                    setKeyObj(keyDummyObj);
                }
            } catch(err) {
                console.error(`Error in getting Survey Questions: ${err}`)
            }
        }
        
        getAllSurveyQuestions();
        
    }, []);

    useEffect(() => {
        // TODO: Get the section question keylist from the backend. Define an API for that first
        const getSectionQuestionKey = async(section) => {
            try {
                const sectionKeys = await axios.get(`${LOCALHOST}/section-question?section=${section}`);
                if(sectionKeys.status == 200) {
                    setSectionKeys(sectionKeys.data);
                    console.log("Successfully fetched section question keys");
                }
            } catch(err) {
                console.error(`Error in fetching Section Question keys: ${err}`);
            }
        }

        if(currentSection !== "done" && currentSection.length > 0) {
            getSectionQuestionKey(currentSection);
        }
    }, [currentSection])


    console.log(modalStatus);

    const handleSection = (sectionTitle) => {
        setCurrentSection(sectionTitle);
    }

    const loadSampleResponse = async() => {
        try {
            const sampleResponses = await axios.get(`${LOCALHOST}/load-sample-res`);

            if(sampleResponses.status == 200) {
                console.log("Sample Responses successfully loaded");
                setResponses(sampleResponses.data);
            }
        } catch(err) {
            console.error(`Error in loading Sample Responses: ${err}`);
        }
    }

    const handleResponses = (responseKey, responseText) => {
        console.log(responseKey, responseText);
        setResponses({...allResponses, [responseKey]: responseText});

        console.log(allResponses);
    }

    
    useEffect(() => {
        const checkStatus = () => {
            for(let response of Object.keys(allResponses)) {
                if(allResponses[response].length === 0) {
                    return true;
                }
            }
    
            return false;
        }

        const performSubmission = async() => {
            try {
                console.log("Yes. I should");
                openModal({message: "Please wait till we prepare the response",
                    status: true
                });// CONTINUE FROM HERE TOMORROW
                
                const sendResponse = await axios.post(`${LOCALHOST}/generate-suggestion`,
                    {user_response: allResponses}
                );
                
                if(sendResponse.status == 200) {
                    console.log("User responses sent successfully");
                }

                openModal({...modalStatus, status:false});
            } catch(err) {
                console.error(`Error in sending User Response: ${err}`);
            }
        }
        setEmptyResponse(checkStatus());

        if(submit == true) {
            performSubmission();
        }
    }, [allResponses, submit])

    console.log(sectionKeys);

    return (
        modalStatus.status ? (<WaitModal key={modalStatus.status} shouldOpen={modalStatus.status} message={modalStatus.message}/>) :
        
        (<div className="survey-card">
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }}>
                <img src={"stress.jpg"} style={{
                    width: "80px",
                    height: "80px",
                    marginRight: "20px"
                }} />
                <Typography variant='h2' sx={{
                textAlign: "center",
                color: "blue",
                fontWeight: "bold",
                fontFamily: "Segoe UI",
                paddingBottom: "25px"
            }}>                         
                
                STRELIEVE
                </Typography>
            </div>

            <QuestionProgress sectionTitleHandler={handleSection} 
                    emptyStatus={anyEmptyResponse} 
                    setSubmissionStatusParent={setSubmit}/>
            { Object.keys(allQuestions).length > 0  && sectionKeys.length > 0 &&
            (sectionKeys.map((questionKey, idx) => (
                <Question prevVal={allResponses[questionKey]} key={keyObj[questionKey]} qKey={questionKey} responseHandler={handleResponses} number={idx+1} questionText={allQuestions[questionKey]['question']}/>
            )))
            // <Question number={2} text={allQuestions['age']['question']}/>
            }
            <div style={{display: 'flex',
                    justifyContent: "center",
                    marginTop: "50px",
                    marginBottom: "25px"
            }}>
                <Button 
                    variant='contained'
                    onClick={loadSampleResponse}
                    sx={{
                        backgroundColor: "purple"
                }}>
                    IMPORT RESPONSE
                </Button>
            </div>
        </div>)
    )
}

export default Survey;