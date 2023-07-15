import { useMemo, useState } from 'react'
import { arrayRange, getRandomArray } from '../utils'
import styles from './index.module.scss'

const addID = (id, list) => {
  return list.includes(id) ? list : [...list, id]
}

export const Game = () => {
  // const memoizedRandomArray = useMemo(() => getRandomArray, [])
  const [cards, setCards] = useState(getRandomArray())
  const [selectedCardsIDs, setSelectedCardsIDs] = useState([])
  const [matchedCardsIDs, setMatchedCardsIDs] = useState([])

  const handleSelectedCard = (id) => {

    if (selectedCardsIDs.length < 2) {
      setSelectedCardsIDs(prev => {
        // console.log("if", addID(id, prev))
        // cards.find(item => item.id === selectedCardsIDs[0]).value
        return addID(id, prev)
      })
    } else {
      setSelectedCardsIDs(() => {
        // console.log("elseif", [])
        return []
      })
    }


    //check if selected cards are matched
    if (selectedCardsIDs.length < 2) return;
    if (cards.find(item => item.id === selectedCardsIDs[0]).value === cards.find(item => item.id === selectedCardsIDs[1]).value) {
      setMatchedCardsIDs(prev => {


        console.log("matched ones=>", [...prev, ...selectedCardsIDs])
        return [...prev, ...selectedCardsIDs]
      })
    } else {

    }




    // const updated = cards.map(item => item.id === id ? { ...item, open: !item.open }: item)
    // setCards(updated)
    // const openCards = updated.filter(item => item.open)
    // if(openCards.length > 1) {
    //   if(openCards[0].value === openCards[1].value) {
    //     // setMatchedCardsIDs(prev => [ ...prev, openCards[0].id, openCards[1].id])
    //   } 
    // } else {

    // }
  }

  return (
    <div className={styles["card"]}>
      {cards.map((item) => (
        <Tile key={item.id} {...{ item, selectedCardsIDs, matchedCardsIDs }} onClick={handleSelectedCard} />
      ))}
    </div>
  )
}


const Tile = ({ item, selectedCardsIDs, matchedCardsIDs, onClick }) => {
  const classes = styles["tile"] + " " + (matchedCardsIDs.includes(item.id) || selectedCardsIDs.includes(item.id) ? styles["selected_tile"] : '')
  return (
    <div className={classes} onClick={() => onClick(item.id)}>
      {item.value}
    </div>
  )
}
