import React from 'react';
import './App.css';
import { Question } from './components/Question'
import { nanoid } from 'nanoid'

function App() {

  //fetched all data from api and saved it to asllquestionsdata state
  const [allquestionsdata, setAllquestionsdata] = React.useState([])
  //filtering out data which is needed for app from allfetcheddata
  const [allquestions, setallquestions] = React.useState([])
  //creating state for saving user answers
  const [useranswers, setUserAnswers] = React.useState([])

  const [hasStarted, setHasStarted] = React.useState(false)

  const[hasSubmit,setHasSubmit]=React.useState(false)
  const[score,setscore] = React.useState(0)
  // let count=0;
  const[count,setcount] = React.useState(0)
  //fetching data from api
  React.useEffect(() => {

    fetch("https://opentdb.com/api.php?amount=10&category=9&type=multiple")
      .then(res => res.json())
      .then(data => setAllquestionsdata(data.results))

  }, [count])


  //filtering data
  React.useEffect(() => {
    setallquestions(allquestionsdata.map(item => {
      //combining incoorect options and correct option nad then shuffling them
      let alloptions = item.incorrect_answers
      alloptions = [...alloptions, item.correct_answer]

      const shuffledArray = []
      for (let i = 0; i < 4; i++) {
        shuffledArray.splice(Math.floor(Math.random() * 4), 0, alloptions[i])
      }

      return {
        id: nanoid(),
        question: item.question,
        correct_answer: item.correct_answer,
        options: shuffledArray
      }


    }))
  }, [allquestionsdata])


  //crating element for each question 
  const allElements = allquestions.map(item => {
    return <Question
      key={item.id}
      id={item.id}
      question={item.question}
      correct_answer={item.correct_answer}
      options={item.options}
      saveanswer={saveanswer}
      issubmit = {hasSubmit}
      // useranswer = {useranswers.user_answer}
    />
  })

  //opening page logic
  

  function start() {
    setHasStarted(true)

    setUserAnswers(allquestions.map(item => {
      return {
        id: item.id,
        correct_answer: item.correct_answer,
        user_answer: ""
      }
    }))
  }

  //this function will be called when user clicked on any answer
  function saveanswer(id, useranswer, correctanswer) {
    setUserAnswers(oldanswers => oldanswers.map(item => (

      item.id === id ? {
        id: item.id,
        correct_answer: item.correct_answer,
        user_answer: useranswer

      } : item


    )))
  }

  console.log("useranswer", useranswers)

  

  function submit(){
    setHasSubmit(true)
    let userscore = useranswers.map(item=>{
      
      return item.user_answer === item.correct_answer ? 1:0
      
    })

    let sum = 0

    userscore.forEach(x=>{
      sum+=x
    })
    console.log(sum)
    setscore(sum)

  }
  

  function playagain(){
    setHasSubmit(false)
    setHasStarted(false)
    setcount(oldvalue=>oldvalue+1)
  }
  return (
    <div className="App">
      {hasStarted ? <div>
        {allElements}
        <div className="submit-or-playagain">
          {hasSubmit ? <div className="playagain">
                          <h3>You Scored {score}/{allElements.length} correct answers !</h3>
                          <button className='playagain-btn' onClick={playagain}>Play again</button>
                      </div>
                    :<button className='submit' onClick={submit}>Submit</button>}
          
        </div>
        </div> : 
      <div className='main-container'>
        <div className='landingpage-container'>
          <h1>Quizzical</h1>
          <p>This quiz is a short test of knowledge, typically around 10 questions in length, with multiple choice question format.</p>
          <button onClick={start}>Start quiz</button>
        </div>
      </div>
      }
      
    </div>
  );
}

export default App;
