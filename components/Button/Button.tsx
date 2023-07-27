import React from "react";
import { useState, useEffect } from "react";
import styles from './button.module.css'
import { useDebounce } from "@/utils/useDebounce";

interface Button {
  text: string
}

function Button({text}: Button) {
  const [like, setLike] = useState(false);

  const fetchData = async () => {
    console.log('hi');
    const req = await fetch('https://like-button-endpoints.vercel.app/api/like');
    const newData = await req.json();

    return newData;
  };

  const updateLike = async () => {
    setLike(await fetchData())
  }

  const handleClick = useDebounce(updateLike, 5000)

  return (
    <div>
      {like ? <button className={styles.like} onClick={handleClick}>{text}</button> : <button className={styles.btn} onClick={handleClick}>{text}</button> }
    </div>
    
  )
}

export default Button;