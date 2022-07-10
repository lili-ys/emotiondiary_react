import { useContext, useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {

    const navigate = useNavigate();
    const [originData, setOriginData] = useState();
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        if(diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );

            if(targetDiary) {
                setOriginData(targetDiary);
            } else {
                navigate('/', {replace: true})
            }
        }
    }, [id, diaryList]);



    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
};

export default Edit;