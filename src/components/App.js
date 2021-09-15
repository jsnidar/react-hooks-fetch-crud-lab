import React, { useState, useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(data => setQuestions(data)
    )}, [])
  
  function addQuestion(newQuestion) {
    const updatedQuestions = [...questions, newQuestion]
    setQuestions(updatedQuestions)
  }

  function handleDelete (id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id)
      setQuestions(updatedQuestions)
    });
  }

  function updateCorrectAnswer(id, index){
    const int = parseInt(index, 10)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correctIndex: index
      })
    })
  }
  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm questions={questions} addQuestion={addQuestion}/> : <QuestionList questions={questions} handleDelete={handleDelete} updateCorrectAnswer={updateCorrectAnswer} />}
    </main>
  );
}

export default App;
