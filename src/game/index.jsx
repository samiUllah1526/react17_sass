import { useMemo, useState } from 'react'
import { getRandomArray } from '../utils'
import styles from './index.module.scss'

export const Game = () => {
  const [cards, setCards] = useState(getRandomArray())
  const [selectedCardsIDs, setSelectedCardsIDs] = useState([])
  const [matchedCardsIDs, setMatchedCardsIDs] = useState([])

  const handleSelectedCard = (id) => {
    if (selectedCardsIDs.length < 2) {
      const tempSelectedIDs = selectedCardsIDs.includes(id) ? selectedCardsIDs : [...selectedCardsIDs, id]
      const tempSelectedCards = cards.filter(item => tempSelectedIDs.includes(item.id))

      if (tempSelectedCards.length === 2) {
        if (tempSelectedCards[0].value === tempSelectedCards[1].value) {
          setMatchedCardsIDs(prev => [...prev, ...tempSelectedIDs])
        setSelectedCardsIDs([])
        } else {
          setSelectedCardsIDs([])
        }
      } else {
        setSelectedCardsIDs([tempSelectedIDs[0]])
      }
    }
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
