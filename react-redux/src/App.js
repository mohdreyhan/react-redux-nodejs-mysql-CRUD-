import React from 'react';
import Counter from './Component/Counter';
import store from './Store/Store.js';

function App() {
  return (
   
    <Counter store= {store}/>
     );
}

export default App;
