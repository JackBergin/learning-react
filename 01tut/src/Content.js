import { useState } from 'react'

const Content = () => {
  const [name, setName] = useState('Jack');

  const [count, setCount] = useState(1);

  const handleNameChange = () =>{
      const names = ['Jack', 'Ryan', 'Sean'];
      const int = Math.floor(Math.random()*3);
      setName(names[int]);
  } 
  const handleCount = () =>{
    const int = count+1;
    setCount(int);
} 

  const handleClick = () => {
    handleCount()
    console.log(count)
  }
  const handleClick2 = (name) => {
    console.log(`${name} was clicked`)
  }


  return (
    <main>
        <p onDoubleClick={handleClick}>
            Hello {name}!
        </p>
        <button onClick={handleNameChange}>Click to Change Name</button>
        <button onClick={() => {handleClick('Jack')}}>Click It</button>
        <button onClick={(e) => {handleClick2(e)}}>Click It</button>
    </main>
  )
}

export default Content