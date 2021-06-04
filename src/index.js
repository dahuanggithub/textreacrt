import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import './datePicker.css';


function DatePicker (props) {
  const [cells,setCells] = useState([]);
  const [select, setSelect] = useState('yyyy-mm-dd')
  const [y,setYear] = useState(0)
  const [m,setMonth] = useState(0)
  const [d,setDate] = useState(0)

  useEffect(() => {
    let def;
    if (y === 0 && m === 0 && d === 0 ) {
      def = new Date()
      setYear(def.getFullYear())
      setMonth(def.getMonth() + 1)
      setDate(def.getDate())
    } else {
      def = new Date(y,m,d)
    }
    
    const w = def.getDay() === 0 ? 7 : def.getDay()
    const count = calMonthDays(y, m) // 本月天数
    const permcount = m === 1 ? calMonthDays(y - 1, 12) : calMonthDays(y, m - 1) // 上月总天数
    const percount = w - d % 7 // 需显示的上月天数
    const nextcount = 42 - count - percount // 需显示的下月总天数
    let arr = []
    for(let i = percount - 1; i >= 0; i --) {
      arr.push({
        date: (m === 1 ? y - 1 : y) + '-' + (m === 1 ? 12 : m - 1) + '-' + (permcount - i),
        d: permcount - i,
      })
    }
    for(let i = 1; i <= count; i ++) {
      arr.push({
        date: y + '-' + m + '-' + i,
        d: i,
      })
    }
    for(let i = 1; i <= nextcount; i ++) {
      arr.push({
        date: (m === 12 ? y + 1 : y) + '-' + (m === 12 ? 1 : m + 1) + '-' + i,
        d: i,
      })
    }
    console.log(1)
    setCells(arr)
    setSelect(y + '-' + m + '-' + d)
  },[y,m,d])

  const weeks = ['一','二','三','四','五','六','日'].map( w => <div key={w} className="week-cell">{w}</div>)
  const elcells = cells.map(c => <Cell key={c.date} isSelected={select===c.date} select={() => setSelect(c.date)} value={c.d}/>)

  return (
    <div className="d-p">
      <div className="tool">
        <div className="tool-left">{select}</div>
        <div className="tool-right">
          <button >上月</button>
          <button >下月</button>
        </div>
      </div>
      <div className="week-line">{weeks}</div>
      <div className="box">{elcells}</div>
    </div>
  )
}

function Cell(props) {
  return <div className={props.isSelected ? 'cell select' : 'cell'}  onClick={props.select}>{props.value}</div>
}

ReactDOM.render(
  <DatePicker />,
  document.getElementById('root')
);


// 计算年月 对应的天数
function calMonthDays(y,m) {
  let count
  if (m === 2) {
    count = y % 4 === 0 && y % 100 !== 0 ? 29 : 28
  } else{
    count = (m < 8 && m % 2 === 1) || (m > 7 && m % 2 === 0) ? 31 : 30
  }
  return count
}