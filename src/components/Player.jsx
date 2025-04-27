
import { useState } from "react";

 export default function Player ({playerName,playerSymbol,isActive}) {


    const [isEditing,setIsEditing] = useState(false);
    const [isplayerName,setPlayerName] = useState(playerName)

    
    const handleOnClickEdit = () => {
        // setIsEditing(!isEditing) you can do this but its not recommended. -performance
        setIsEditing((editing) => !editing)
    }

    const handleOnChange = (ev) => {
        setPlayerName(ev.target.value)
    }

    let changingElement =  <span className="player-name"> {isplayerName} </span>
    let button = <button onClick={handleOnClickEdit}>{isEditing ? "Save" : "Edit"}</button>
    if (isEditing) { 
         changingElement = <input type="text" required defaultValue={playerName}  onChange={handleOnChange} />
         
     }

    return (
        <>
        <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {changingElement}
            <span className="player-symbol"> {playerSymbol} </span>
        </span>
        {button}
        </li>
        </>
    )




            {/* {isEditing ?
                <>
                <span className="player">
                    <input type="text"  onChange={handleOnChange} />
                    <span className="player-symbol"> {playerSymbol} </span>
                </span>
                <button onClick={handleOnClickSave}> Save </button></> 
            : 
                <>
                <span className="player">
                    <span className="player-name"> {isplayerName} </span>
                    <span className="player-symbol"> {playerSymbol} </span>
                </span>
                <button onClick={handleOnClickEdit}> Edit</button>
                </>
            } */}

}