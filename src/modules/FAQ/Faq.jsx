import {Fragment, useState} from "react";

import './styles.scss'
import faqs from './faqs'

const Faq = () => {

  const [questions, setQuestions] = useState(faqs);

  const openFaq = (id) => {
    console.log(id);
    console.log(questions);
    const currentQuestion = questions.find(question => question.id === id);
    currentQuestion.open = !currentQuestion.open;
    console.log('currentQuestion', currentQuestion);
    const questionsWithoutCurrent = questions.filter(question => question.id !== id);
    console.log('currentQuestion', currentQuestion);
    setQuestions([
      ...questionsWithoutCurrent,
      currentQuestion
    ]);
  }

  return(
    <div className="faq-main">
      <div className="common-questions">
        <h2>Поширені питання по проєкту</h2>
      </div>
      <div className="questions-list">
        <div className="faq-list">
          {faqs.map((item)=>{
            return (
              <Fragment  key={item.id}>
                <div className="faq-question" onClick={() => {openFaq(item.id)}}>{item.question}</div>
                <div className={`faq-answer ${item.open ? 'open' : ''}`}>{item.answer}</div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Faq;
