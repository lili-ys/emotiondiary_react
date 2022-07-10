import React, { useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import { useEffect } from 'react';


const reducer = (state, action) => {
  let newState = [];

  switch(action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => 
        it.id === action.data.id ? {...action.data} : it
      );
      break;
    }     
    default:
      return state;
  } 
  localStorage.setItem('diary', JSON.stringify(newState))
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: '오늘의 일기 1번',
    date : 1657347582621,
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기 2번',
    date : 1657347582622,
  },
  {
    id: 3,
    emotion: 3,
    content: '오늘의 일기 3번',
    date : 1657347582623,
  },
  {
    id: 4,
    emotion: 4,
    content: '오늘의 일기 4번',
    date : 1657347582624,
  },
  {
    id: 5,
    emotion: 5,
    content: '오늘의 일기 5번',
    date : 1657347582625,
  },
]



function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  useEffect(()=>{
    const localData = localStorage.getItem('diary');
    if(localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(diaryList[0].id) + 1;

      dispatch({ type: 'INIT', data: diaryList });
    }
  },[]);

  const  dataId = useRef(6);
  //dummpy 데이터 id값 +1부터 시작하게

  //create
  const onCreate = (content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id:dataId.current,
        emotion,
        content,
        date: new Date().getTime(),
      },
    });
    dataId.current += 1;
  }
  //remove
  const onRemove = (targetId) => {
    dispatch({
      type: 'REMOVE',
      targetId
    })
  }
  //edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        emotion,
        content,
        date: new Date(date).getTime(),
      }
    })

  }


  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || '';

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onRemove,
          onEdit,
        }}
      >
        <BrowserRouter>
          <div className="App">   
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/new' element={<New/>}></Route>
              <Route path='/edit/:id' element={<Edit/>}></Route>
              <Route path='/diary/:id' element={<Diary/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
