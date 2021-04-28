import React, { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';

function App() {
  const [simpleStorage, setSimpleStorage] = useState(undefined);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { simpleStorage } = await getBlockchain();
      const data = await simpleStorage.readData();
      setSimpleStorage(simpleStorage);
      setData(data);
    };
    init();
  }, []);

  const updateData = async e => {
    e.preventDefault();
    const data = e.target.elements[0].value;
    const tx = await simpleStorage.updateData(data);
    await tx.wait();
    const newData = await simpleStorage.readData();
    setData(newData);
  };

  if(
    typeof simpleStorage === 'undefined'
    || typeof data === 'undefined'
  ) {
    return 'Loading...';
  }

  return (
    <div className='container'>
      <div className='row'>

        <div className='col-sm-6'>
          <h2>Data:</h2>
          <p>{data.toString()}</p>
        </div>

        <div className='col-sm-6'>
          <h2>Change data</h2>
          <form className="form-inline" onSubmit={e => updateData(e)}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="data"
            />
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Hello world
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
