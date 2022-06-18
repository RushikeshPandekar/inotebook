import React,{ useState}  from 'react'
import NoteContext from './NoteContext';

const NoteState=(props)=> {
  const n1=[
    {
      "_id": "62a9b4143be631619349b879",
      "userId": "62a722a83c29bca0cb038292",
      "title": "Rishabh",
      "description": "Consider himself as dhoni",
      "tags": [
        "sasta dhoni",
        "bhangar"
      ],
      "date": "2022-06-15T10:27:32.301Z",
      "__v": 0
    },
    {
      "_id": "62a9b4253be631619349b87b",
      "userId": "62a722a83c29bca0cb038292",
      "title": "Rishabh",
      "description": "Consider himself as dhoni",
      "tags": [
        "sasta dhoni",
        "bhangar"
      ],
      "date": "2022-06-15T10:27:49.466Z",
      "__v": 0
    },
    {
      "_id": "62a9b4143be631619349b879",
      "userId": "62a722a83c29bca0cb038292",
      "title": "Rishabh",
      "description": "Consider himself as dhoni",
      "tags": [
        "sasta dhoni",
        "bhangar"
      ],
      "date": "2022-06-15T10:27:32.301Z",
      "__v": 0
    },
    {
      "_id": "62a9b4253be631619349b87b",
      "userId": "62a722a83c29bca0cb038292",
      "title": "Rishabh",
      "description": "Consider himself as dhoni",
      "tags": [
        "sasta dhoni",
        "bhangar"
      ],
      "date": "2022-06-15T10:27:49.466Z",
      "__v": 0
    },
    {
      "_id": "62a9b4143be631619349b879",
      "userId": "62a722a83c29bca0cb038292",
      "title": "Rishabh",
      "description": "Consider himself as dhoni",
      "tags": [
        "sasta dhoni",
        "bhangar"
      ],
      "date": "2022-06-15T10:27:32.301Z",
      "__v": 0
    },
    {
      "_id": "62a9b4253be631619349b87b",
      "userId": "62a722a83c29bca0cb038292",
      "title": "Rishabh",
      "description": "Consider himself as dhoni",
      "tags": [
        "sasta dhoni",
        "bhangar"
      ],
      "date": "2022-06-15T10:27:49.466Z",
      "__v": 0
    },
  ]
  const [notes, setNotes] = useState(n1);
  return (
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;