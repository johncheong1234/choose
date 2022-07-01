import './App.css';
import React, { useEffect , useState, useRef } from "react";
import { createApi } from 'unsplash-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Picture from './Picture';
import Choice from './Choice';
const unsplash = createApi({ accessKey: '3cRYHKMrnGd2DTesdfvnRtQDOQFjz0OxtPt35NpeJQ8' });
const words = ['trousers', 'underwear', 'angle', 'pull', 'spy', 'record', 'swing', 'plate', 'home', 'uncle', 'chance', 'sweater', 'income', 'spark', 'apparel', 'experience',
  'lunchroom', 'fact', 'skin', 'toothbrush', 'sugar', 'carriage', 'middle', 'day', 'island', 'government', 'authority', 'front', 'icicle', 'grain', 'payment',
  'turkey', 'hour', 'heat', 'sidewalk', 'place', 'boat', 'ghost', 'jelly', 'house', 'society', 'marble', 'connection', 'health', 'burst', 'knife', 'rice',
  'advice', 'chicken', 'arch', 'brass', 'volcano', 'wheel', 'stomach', 'air', 'mark', 'stitch', 'pear', 'dogs', 'cherries', 'thumb', 'cactus', 'beef', 'wall',
  'flowers', 'plough', 'reason', 'dinner', 'rain', 'cracker', 'quince', 'hobbies', 'jeans', 'quicksand', 'office', 'event', 'vessel', 'visitor', 'fly', 'sense',
  'mountain', 'act', 'man', 'bead', 'animal', 'fold', 'trains', 'waves', 'prose', 'expert', 'quiver', 'ship', 'creature', 'bucket', 'education', 'title',
  'action', 'border', 'look', 'scarf']

function backtracker(words,choices){
  if(choices.length === 3){
    return;
  }
  const word = words[Math.floor(Math.random() * words.length)];
  if(choices.indexOf(word) === -1){
    choices.push(word);
    backtracker(words, choices);
  }else{
    backtracker(words, choices);
  }
}

function selectChoices(words){
  const choices = [];

  backtracker(words, choices);

  return choices;
}

function App() {
  
  const [photos, setPhotos] = useState([]);
  const [answer, setAnswer] = useState('');
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(1);

  useEffect(() => {
    if(choices.length>0){
      let randomIndex = Math.floor(Math.random()*3 )
    console.log(randomIndex)
    unsplash.search.getPhotos({
      query: choices[randomIndex],
      page: 1,
      perPage: 1,
      orientation: 'portrait',
    }).then(result => {
      if (result.errors) {
        // handle error here
        console.log('error occurred: ', result.errors[0]);
      } else {
        // handle success here
        const results = result.response.results;
        setPhotos(results);
      }
    });

    console.log(choices);

    setAnswer(choices[randomIndex]);
    }else{
      setChoices(selectChoices(words));
    }
    
  }, [choices]);

  useEffect(() => {
    if(choices.length>0){
      if(score==5){
        alert('You win!')
        setScore(0);
        setChoices(selectChoices(words));
      }else if(score==-5){
        alert('You lose!')
        setScore(0);
        setChoices(selectChoices(words));
      }else{
        setChoices(selectChoices(words));
      }
    }
    
    
  },[score]) 


  return(
  
  <div style={{textAlign: 'center'}}>
    <h1>Choose Game</h1>
    <div className='choices'>
      
      {
        choices.map((choice, index) => {     

          return <Choice key={index} choice={choice} answer={answer} score={score} setScore={setScore} />
          // return <div  key={index} className='choice' onClick={() => {
          //   if(choice === answer){
          //     setScore(score+1);
          //   }else{
          //     setScore(score-1);
          //   }
          //   setChoices(selectChoices(words));
          // }

          // }>{choice}</div>

          // return <div>{choice}</div>
          // return <Choice key={index} choice={choice}></Choice>
          
        }
      )}
    
    </div>
    <div className='photo-container'>
    {photos.map(photo => {
      return <Picture {...photo} key={photo.id} answer={answer} setScore={setScore} score={score} />
    }
      // console.log(photo),
      
      // <Picture {...photo} key={photo.id}></Picture>
      // <img src={photo.urls.regular} alt={photo.alt_description} key={photo.id}/>
    )}
    </div>
    <div>
      <h1>Score: {score}</h1>
    </div>
    </div>
    
    );
}

export default App;
