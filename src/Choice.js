// import { propTypes } from 'react-bootstrap/esm/Image';
import {useDrop} from "react-dnd";
import React, { useEffect , useState, useRef } from "react";

function Choice(props) {

  const[counter, setCounter] = useState(0);

  useEffect(() => {
    selectChoice();
  }, [counter])

    const [collectedProps, drop] = useDrop(() => ({
        accept: 'picture', 
        drop: () => (
          setCounter(counter+1),
          console.log('drop')
            ),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
           
        }) 
    }),
    [props.score]
    );   

    const selectChoice = () => {
      console.log(props)
      if(props.choice === props.answer){
        props.setScore(props.score+1);
      }else{
        props.setScore(props.score-1);
      }}
    

    // return <div ref={drop} className='choice'>{choice}</div>
    // console.log(props.choice)
    return <div className='choice' ref={drop} onClick={() => {
      setCounter(counter+1);
        }}>{props.choice}</div>
     
  }

export default Choice;