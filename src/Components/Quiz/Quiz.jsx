import { useRef, useState } from 'react'
import { data } from './../../assets/data';
import './Quiz.css'
const Quiz = () => {
  let [index, setIndex] = useState(0)
  let [question, setQuestion] = useState(data[index])
  let [lock, setLock] = useState(false)
  let [score, setScore] = useState(true)
  let [result, setResult] = useState(false)

  let option1 = useRef(null)
  let option2 = useRef(null)
  let option3 = useRef(null)
  let option4 = useRef(null)

  let option_array = [option1, option2, option3, option4]

  const nextQuestion = () => {
    if (index === data.length - 1) {
      setResult(true)
      return 0;
    }
    if (lock === true) {
      setIndex(++index)
      setQuestion(data[index])
      setLock(false);

      option_array.map((option) => {
        option.current.classList.remove("correct")
        option.current.classList.remove("wrong")
        return null;
      })
    }
  }

  const checkAns = (e, ans) => {
    if (lock == false) {
      if (question.answer === ans) {
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev => prev + 1)
      } else {
        e.target.classList.add("wrong")
        setLock(true)
        option_array[question.answer - 1].current.classList.add("correct")
      }
    }

  }


  let reset = () => {
    setIndex(0)
    setQuestion(data[0])
    setScore(0)
    setLock(false)
    setResult(false)
  }


  return (
    <>
      <div className="container">
        <h1>Quiz App</h1>
        <hr />

        {result ? <> </> : <>
          <h2> {index + 1} . {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
            <li ref={option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
            <li ref={option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
            <li ref={option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
          </ul>

          <button onClick={nextQuestion}>Next</button>

          <div className="index">
            {index + 1} of {data.length} Qustions
          </div>
        </>}

        {result ? <>
          {result && <h2>Your Score: {score}/{data.length}</h2>}
          {result && <button onClick={reset}>Resset</button>}
        </> : <></>}


      </div>
    </>
  )
}

export default Quiz