import { useState } from "react";
import { resultInitialState } from "../../Constants";
import "./Quiz.scss";
import AnswerTimer from "../AnswerTimer/AnswerTimer";
const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { question, choices, correctAnswer,type } = questions[currentQuestion];
    const [answerIndex, setAnswerIndex] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setshowResult] = useState(false);
    const [showAnswerTimer,setShowAnswerTimer] = useState(true);
    const [inputAnswer,setInputAnswer] = useState('');

    const onAnswerClick = (choice, index) => {
        setAnswerIndex(index);
        setShowAnswerTimer(false);
        if (choice === correctAnswer) {
            setAnswer(true);
        }
        else {
            setAnswer(false);
        }
    };
    const onClickNext = (finalAnswer) => {
        setAnswerIndex(null);
        setShowAnswerTimer(false);
        setResult((prev) =>
            answer ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1
            } : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1
            }
        );
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        }
        else {
            setCurrentQuestion(0);
            setshowResult(true);
        }
        setTimeout(() => {
            setShowAnswerTimer(true);
        });
    };
    const onTryAgain = () => {
        setResult(resultInitialState);
        setshowResult(false);
    };
    const handleTimeUp = () =>{
        setAnswer(false);
        onClickNext(false);
    };
    const handleInputChange = (evt) =>{
        setInputAnswer(evt.target.value);
        if(evt.target.value===correctAnswer){
            setAnswer(true);
        }
        else{
            setAnswer(false);
        }
    }
    const getAnswerUI = () =>{
        if(type==="FIB"){
            return <input value={inputAnswer} onChange={handleInputChange}/>
        }
        return(
            <ul>
            {
                choices.map((choice, index) => (
                    <li
                        onClick={() => onAnswerClick(choice, index)}
                        key={choice}
                        className={answerIndex === index ? 'selected-answer' : null}>
                        {choice}
                    </li>
                ))
            }
        </ul>
        );
    }
    return (
        <div className="quiz-container">
            {!showResult ? (
                <>
                {showAnswerTimer && <AnswerTimer duration={10} onTimeUp={handleTimeUp}/>}
                    <span className="active-question-no">{currentQuestion + 1}</span>
                    <span className="total-question">/{questions.length}</span>
                    <h2>{question}</h2>
                    {getAnswerUI()}
                    <div className="footer">
                        <button onClick={()=>onClickNext(answer)} 
                        disabled={answerIndex === null && !inputAnswer}>
                            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                        </button>
                    </div>
                </>
                ) : (
                <div className="result">
                    <h3>Result</h3>
                    <p>
                        Total Questions : <span>{questions.length}</span>
                    </p>
                    <p>
                        Total Score : <span>{result.score}</span>
                    </p>
                    <p>
                        Correct Answers : <span>{result.correctAnswers}</span>
                    </p>
                    <p>
                        Wrong Answers : <span>{result.wrongAnswers}</span>
                    </p>
                    <button onClick={onTryAgain}>Try again</button>
                </div>
            )}
        </div >
    );
}

export default Quiz;