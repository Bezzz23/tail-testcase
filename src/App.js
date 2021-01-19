import React, { useState } from 'react'
import Toggle from './components/Toggle'
import Slider from './components/Slider'
import cx from 'classnames';
import './App.css';

function App() {
  const [isNightTheme, setIsNightTheme] = useState(false);
  
  return (
    <div>
      <header>
        <div className={cx("inline-flex items-center p-10 rounded-2xl", {
                'bg-gray-900': isNightTheme,
                'bg-transparent': !isNightTheme,
              })}
            >
          <Toggle onChange={(val) => setIsNightTheme(val)}/>
          <Slider isNightTheme={isNightTheme}/>
        </div>
      </header>
    </div>
  );
}

export default App;
