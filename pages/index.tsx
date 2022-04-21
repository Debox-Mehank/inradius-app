import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Home1 from '../components/homepages/Home1'
import Home2 from '../components/homepages/Home2'
import Home3 from '../components/homepages/Home3'

const Home: NextPage = () => {
  const [randomHome, setRandomHome] = useState<number>()
  useEffect(() => {
    setRandomHome(Math.floor(Math.random() * 3) + 1)
  }, [])

  if (randomHome == 1) {
    return (
      <Home1 />
    )
  } else if (randomHome == 2) {
    return (
      <Home2 />
    )
  } else if (randomHome == 3) {

    return (
      <Home3 />
    )
  } else {
    return (
      <Home1 />
    )
  }

}

export default Home
