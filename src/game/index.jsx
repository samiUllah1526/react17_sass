import { useState } from 'react'
import { getRandomArray } from '../utils'
import styles from './index.module.scss'

export const Game = () => {
  const [cards, setCards] = useState(getRandomArray())
  const [selectedCardsIDs, setSelectedCardsIDs] = useState([])
  const [matchedCardsIDs, setMatchedCardsIDs] = useState([])

  const handleReset = () => {
    setCards(getRandomArray())
    setSelectedCardsIDs([])
    setMatchedCardsIDs([])
  }

  const handleSelectedCard = (id) => {
    const tempSelectedIDs = selectedCardsIDs.includes(id) ? selectedCardsIDs : [...selectedCardsIDs, id]
    const tempSelectedCards = cards.filter(item => tempSelectedIDs.includes(item.id))

    if (tempSelectedCards.length !== 2) {
      setSelectedCardsIDs([tempSelectedIDs[0]])
      return
    }

    if (tempSelectedCards[0].value !== tempSelectedCards[1].value) {
      setSelectedCardsIDs([])
      return
    }

    setMatchedCardsIDs(prev => [...prev, ...tempSelectedIDs])
    setSelectedCardsIDs([])
  }


  return (
    <div className={styles['wrapper']}>
      <div className={styles["card"]}>
        {cards.map((item) => (
          <Tile key={item.id} {...{ item, selectedCardsIDs, matchedCardsIDs }} onClick={handleSelectedCard} />
        ))}
      </div>
      <button className={styles['btn']} onClick={handleReset}>Reset</button>
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
