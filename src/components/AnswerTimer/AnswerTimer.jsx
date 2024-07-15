import "./AnswerTimer.scss";
import { useEffect,useState,useRef} from "react";
const AnswerTimer = ({duration,onTimeUp}) =>{
    const [counter,setCounter] = useState(0);
    const intervalRef=useRef();
    const [progressLoaded,setProgress] = useState(0);
    useEffect(()=>{
        intervalRef.current = setInterval(()=>{
            setCounter((cur) => cur+1);
        },1000)
        return () =>clearInterval(intervalRef.current);
    },[])
    useEffect(()=>{
        setProgress(100*(counter/duration));
        if(counter===duration){
            clearInterval(intervalRef.current);
            setTimeout(()=>{
                onTimeUp();
            },1000)
        }
    },[counter]);
    return(
        <div className="answer-timer">
            <div 
            style = {{
                width : `${progressLoaded}%`,
                backgroundColor : `${
                    progressLoaded<50
                    ? 'lightgreen'
                    : progressLoaded<70
                    ? 'orange'
                    :  'red'
                }`,
            }}
            className="progress">

            </div>
        </div>
    );
}
export default  AnswerTimer;
