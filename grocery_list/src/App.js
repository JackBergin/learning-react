import Header from './Header';
import Content from './Content'
import SearchItem from './SearchItem';
import Footer from './Footer'
import { useState } from 'react'
import AddItem from './AddItem';

function App() {
  // NOTE: This should work through chrome or on a windows machine but does not on a mac. Within the tutorial I was doing
  // this seemed to keep the instructors history but for me, when I would referesh, safari would bring me back to the 
  // Item 3 and Item 2 values. It was pretty confusing. On top of this, the following line, when used from the cloned repo 
  // will induce a runtime error. I believe this is to do with the fact that the list is empty in localStorage, so to try and 
  // filter an empty list as done in this file will lead to massive problems. Hence why I reverted back to the hard coded list 
  // for the time being. 

  //const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));

  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted"
    },
    {
      id: 2,
      checked: false,
      item: "Item 2"
    },
    {
      id: 3,
      checked: false,
      item: "Item 3"
    }
  ]);

  const [search, setSearch] = useState('')
  const [newItem, setNewItem] = useState('')

  const setAndSaveItems = (newItems) => {
    setItems(newItems)
    localStorage.setItem('shoppinglist', JSON.stringify(newItems))
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems)
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item);
    setAndSaveItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem)
    // prevents fenceposting
    setNewItem('');
    console.log('submitted')
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />

      <Footer length={items.length} />
    </div>
  );
}

export default App;
