import React, { useState, useRef } from 'react'
import cx from 'classnames';
import NumberFormat from 'react-number-format';

function Slider({ initial = 10, max = 100, isNightTheme = false, onChange }) {
  const [inputSlider, setInputSlider] = useState(initial);
  const [percentage, setPersentage] = useState(initial);
  const sliderRef = useRef();
  const thumbRef = useRef();
  const diff = useRef();

  const getPercentage = (current, max) => (100 * current) / max;
  const getValue = (percentage, max) => (max / 100) * percentage;

  const onChangeSlider = (val) => {
    setPersentage(val)
    setInputSlider(val.toFixed(2, 10))
    onChange && onChange(val)
  }

  const onChangeInput = (e) => {
    
    let val = e.value

    if (!val) {
      val = 0
    }

    if (val < 0) {
      val = 0
    }

    if (val > 100) {
      val = 100
    }

    setInputSlider(val)
    setPersentage(val)
    onChange && onChange(val)
  }
 
  const getLeft = percentage => percentage < 8 ? 0 : `calc(${percentage}% - 8px)`;
  const handleMouseMove = event => {
    let newX =
      event.clientX -
      diff.current -
      sliderRef.current.getBoundingClientRect().left;
      const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;
 
      const start = 0;
  
      if (newX < start) {
        newX = 0;
      }
  
      if (newX > end) {
        newX = end;
      }
      const newPercentage = getPercentage(newX, end);
      const newValue = getValue(newPercentage, max);
      onChangeSlider(newValue);

 
      thumbRef.current.style.left = getLeft(newPercentage);
  };
 
  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };
 
  const handleMouseDown = event => {
    diff.current =
      event.clientX - thumbRef.current.getBoundingClientRect().left;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };


  return <div
  className={cx("p-5 flex justify-between items-center rounded-xl border border-gray-400", {
    'bg-gray-800': isNightTheme,
    'bg-white': !isNightTheme,
    'shadow-lg': !isNightTheme
  })}
  style={{ width: '286px', height: '76px'}}>
    <div className="mr-5 w-full">
      <div className="bg-gray-300 h-1 w-full rounded-full relative" ref={sliderRef}>
      <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span
          className={cx("bg-white h-2 w-2 -mt-0.5 z-10 shadow rounded-full cursor-pointer", {
            'bg-blue-600': percentage > 0,
          })}
          ></span>
          <span
          className={cx("bg-white h-2 w-2  -mt-0.5 z-10 shadow rounded-full cursor-pointer", {
            'bg-blue-600': percentage > 25,
          })}
          ></span>
          <span
          className={cx("bg-white h-2 w-2 -mt-0.5 z-10 shadow rounded-full cursor-pointer", {
            'bg-blue-600': percentage > 50,
          })}
          ></span>
          <span
          className={cx("bg-white h-2 w-2  -mt-0.5 z-10 shadow rounded-full cursor-pointer", {
            'bg-blue-600': percentage > 75,
          })}
          ></span>
          <span
          className={cx("bg-white h-2 w-2 -mt-0.5 z-10 shadow rounded-full cursor-pointer", {
            'bg-blue-600': percentage >= 100,
          })}
          ></span>
      </div>
        <span
          className="bg-blue-600 h-2 w-2 absolute top-0 -mt-0.5 z-20 shadow rounded-full cursor-pointer flex items-center justify-center"
          ref={thumbRef} onMouseDown={handleMouseDown}
          style={{ left: getLeft(percentage) }}
        >
            <span
            className="bg-white h-1 w-1 rounded-full block"
            ></span>
          </span>
        <span
          className="bg-blue-600 h-1 absolute left-0 top-0 rounded-full"
          style={{ width: `${percentage}%` }}
        >
        </span>
      </div>
    </div>
    <div>
      <NumberFormat
        suffix={'%'}
        value={inputSlider}
        className={cx("w-16 h-10 rounded-md text-xs text-center border border-gray-400 bg-transparent", {
          'text-white': isNightTheme,
          'text-gray-900': !isNightTheme,
        })}
        onValueChange={onChangeInput}
      />
    </div>
    
  </div>
}

export default Slider;
