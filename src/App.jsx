import React from 'react'
import Search from './components/Search.jsx'

const App = () => {
  const [searchItem, setSearchItem] = React.useState('I AM BATMAN');
  return (
    <div className="pattern">

<div className="wrapper">
<header>
  <img src="hero-img.png" alt="Logo" className="logo" />
  <h1> Find <span className="text-gradient">Movies </span>you'll Enjoy Without the hassle </h1>
</header>
<Search searchItem={searchItem} setSearchItem={searchItem}/>
</div>
    </div>
  )
}

export default App
