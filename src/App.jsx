import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function useAnimalSearch() {
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery')
    search(lastQuery)
  },[])

  async function search(q) {
    const response = await fetch("http://localhost:8080?" + new URLSearchParams({q}))
    const data = await response.json()
    setAnimals(data)
    localStorage.setItem('lastQuery', q)
  }

  return {search, animals}
}

function App() { 
  const {search, animals} = useAnimalSearch()

  return (
    <main className="App">
      <h1>Animal Farm</h1>
      <input type="text" placeholder='Search Animals' onChange={(e) => search(e.target.value)}/>

      <ul>
        { animals.map(animal => (
          <Animals key={animal.id} {...animal}/>
        ))}

        {animals.length == 0 && 'No Animals found'}
      </ul>

    </main>
  )
}

function Animals({name, age, type}){
  return(
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  )
}

export default App
