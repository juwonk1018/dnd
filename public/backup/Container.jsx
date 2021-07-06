import { useState, useCallback, useEffect } from 'react';
import { Card } from './Card';
import update from 'immutability-helper';
import axios from "axios";
import customer from "./customer";
const style = {
    width: 200,
};
export const Container = () => {
    {
        const [users, setUsers] = useState([]);
        const [cards, setCards] = useState([]);
        const callApi = async() =>{
            const response = await axios.get("http://localhost:3002/api");
            setUsers(response.data);
            setCards(JSON.parse(users));
            console.log(response.data);
        
            
        };
        
        useEffect(() => {
            callApi();
        },[users]);

        const moveCard = useCallback((dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(update(cards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        }, [cards]);
        const renderCard = (card, index) => {
            return (<Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard}/>);
        };
        return (<>
				<div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
			</>);
    }
};
