import React, { useState } from 'react';
import style from './Item.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import PopupEditPeople from '../../PopupEditPeople/PopupEditPeople';

type ItemProps = {
  data: object[]
  index: number
  value: object
  arrayOfKeys: string[]
  setData: Function
}

const Item: React.FC<ItemProps> = (props: ItemProps) => {
  const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false)

  return (
    <motion.div 
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    className={style.Item}>
      <AnimatePresence>
        {popupIsVisible && 
        <PopupEditPeople 
        value={props.value}
        data={props.data}
        setData={props.setData}
        index={props.index}
        arrayOfKeys={props.arrayOfKeys}
        setPopupIsVisible={setPopupIsVisible}/>}
      </AnimatePresence>
      <div className={style.index}>
        #{props.index}
      </div>
      {props.arrayOfKeys.map((value, index) => {
        return (
          <div className={style.line}>
            <div className={style.key}>
              {value}
            </div>
            <div className={style.value}>
              {Object.values(props.value)[index]}
            </div>
          </div>
        )
      })}
      <div className={style.buttons}>
        <button 
        onClick={() => {
          setPopupIsVisible(!popupIsVisible)
        }}
        className='buttonYellow'>
          {popupIsVisible ? "Готово" : "Редактировать"}
        </button>
        <button 
        onClick={() => {
          const tempArray: object[] = props.data
          tempArray.splice(props.index, 1)
          props.setData([...tempArray])
          console.log(tempArray)
        }}
        className='buttonRed'>
          Удалить
        </button>
      </div>
    </motion.div>
  );
}

export default Item;