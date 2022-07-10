import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import DiaryList from "../components/DiaryList";


const Home = () => {
    const diaryList = useContext(DiaryStateContext);

    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        if (diaryList.length >= 1){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1 //첫 날 (시, 분, 초는 입력 안해서 0시 0분 0초로 설정됨)
            ).getTime();
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,              
                0, //전 달의 마지막 날              
                23, //시간                
                59, //분              
                59 //초
            ).getTime();

            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
        }
    }, [diaryList, curDate])

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
    }
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
    }
    return (
        <div>
            <MyHeader 
            headText={headText} 
            leftChild={<MyButton text={"<"} onClick={decreaseMonth} />} 
            rightChild={<MyButton text={">"} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;