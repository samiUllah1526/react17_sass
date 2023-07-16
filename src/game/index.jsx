import { useState } from 'react'
import { getRandomArray } from '../utils'
import styles from './index.module.scss'

export const Game = () => {
  const [tiles, setTiles] = useState(getRandomArray())
  const [selectedTilesIDs, setSelectedTilesIDs] = useState([])
  const [matchedTilesIDs, setMatchedTilesIDs] = useState([])

  const handleReset = () => {
    setTiles(getRandomArray())
    setSelectedTilesIDs([])
    setMatchedTilesIDs([])
  }

  const handleSelectedCard = (id) => {
    const tempSelectedIDs = selectedTilesIDs.includes(id) ? selectedTilesIDs : [...selectedTilesIDs, id]
    const tempSelectedTiles = tiles.filter(item => tempSelectedIDs.includes(item.id))

    if (tempSelectedTiles.length !== 2) {
      setSelectedTilesIDs([tempSelectedIDs[0]])
      return
    }

    if (tempSelectedTiles[0].value !== tempSelectedTiles[1].value) {
      setSelectedTilesIDs([])
      return
    }

    setMatchedTilesIDs(prev => [...prev, ...tempSelectedIDs])
    setSelectedTilesIDs([])
  }


  return (
    <div className={styles['wrapper']}>
      <div className={styles["board"]}>
        {tiles.map((item) => (
          <Tile key={item.id} {...{ item, selectedTilesIDs, matchedTilesIDs }} onClick={handleSelectedCard} />
        ))}
      </div>
      <button className={styles['btn']} onClick={handleReset}>Reset</button>
    </div>
  )
}


const Tile = ({ item, selectedTilesIDs, matchedTilesIDs, onClick }) => {
  const selected = matchedTilesIDs.includes(item.id) || selectedTilesIDs.includes(item.id) ? styles["selected_tile"] : ''
  
  const handleClick = (e) => {
    e.preventDefault()
    onClick(item.id)
  }

  return (
    <div className={`${styles["tile"]} ${selected}`} onClick={handleClick}>
      {item.value}
    </div>
  )
}
