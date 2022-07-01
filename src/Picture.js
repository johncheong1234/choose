import React from 'react';
import {useDrag} from "react-dnd";

function Picture(props) {
    const [{isDragging}, drag] = useDrag(() => ({
        item: {id: props.id}, 
        type: 'picture', 
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));
    return <div><img ref = {drag} src={props.urls.regular} alt={props.alt_description} key={props.id} style={{display: isDragging? "None": ""}}/></div>;
  }

export default Picture;