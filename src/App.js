import React, { useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';


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

  const  dataId = useRef(6);
  //dummpy 데이터 id값 +1부터 시작하게

  //create
  const onCreate = (content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id:dataId.current,
        date: new Date().getTime(),
        content,
        emotion
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
        date: new Date(date).getTime(),
        content,
        emotion
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
