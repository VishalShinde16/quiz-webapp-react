import React from 'react'
import './question.css'

import { decode } from 'html-entities';
export const Question = (props) => {

  function handleChange(id, useranswer) {
    // console.log("option selected")
    props.saveanswer(id, useranswer)
    // console.log(id+"=> Users Answer : "+answer)
  }

  // let useranswer = ""
  // const correct_styles ={
  //   backgroundColor:props.hassubmit?"#00FF00":"#F5F7FB"
  //   // backgroundColor:"#00FF00"
  //   // backgroundColor: props.issubmit ? "#59E391" :"#F5F7FB"
  // }


  function applystyle(answer) {
    if (props.issubmit) {
      // console.log(props.useranswer," ",answer)
      // if(props.id+" option-1".isChecked === true){
      //   console.log('hey')
      //   return ({backgroundColor:"#f55742"})
      // }
      if (props.correct_answer === answer) {
        // console.log("heyy")
        return ({ backgroundColor: "#94D7A2" })
      }
      // else{
      //   return({backgroundColor:"#FaFaFa"})
      // }

    }
  }


  return (
    <div className='question-container'>
      <h2 className='question'>{decode(props.question)}</h2>
      <div className="alloptions">
        <input type="radio" name={props.id} value={decode(props.options[0])} className='options' id={props.id + " option-1"} onChange={() => handleChange(props.id, decode(props.options[0]))} />
        <label htmlFor={props.id + " option-1"} style={applystyle(decode(props.options[0]))}>{decode(props.options[0])}</label>

        <input type="radio" name={props.id} value={decode(props.options[1])} className='options' id={props.id + " option-2"} onChange={() => handleChange(props.id, decode(props.options[1]))} />
        <label htmlFor={props.id + " option-2"} style={applystyle(decode(props.options[1]))}>{decode(props.options[1])}</label>

        <input type="radio" name={props.id} value={decode(props.options[2])} className='options' id={props.id + " option-3"} onChange={() => handleChange(props.id, decode(props.options[2]))} />
        <label htmlFor={props.id + " option-3"} style={applystyle(decode(props.options[2]))}>{decode(props.options[2])}</label>

        <input type="radio" name={props.id} value={decode(props.options[3])} className='options' id={props.id + " option-4"} onChange={() => handleChange(props.id, decode(props.options[3]))} />
        <label htmlFor={props.id + " option-4"} style={applystyle(decode(props.options[3]))}>{decode(props.options[3])}</label>
      </div>
      <hr className='horizontal-line' />

    </div>
  )
}
