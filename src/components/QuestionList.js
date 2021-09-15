import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList( {questions, handleDelete, updateCorrectAnswer } ) {
  console.log(questions)
  
  const listOfQuestions = questions.map((question) => <QuestionItem key={question.id} question={question} handleDelete={handleDelete} updateCorrectAnswer={updateCorrectAnswer} />);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{listOfQuestions}</ul>
    </section>
  );
}

export default QuestionList;
