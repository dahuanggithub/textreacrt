import React, { useState,useEffect } from 'react';
import {Motion, spring} from 'react-motion';
import ReactDOM from 'react-dom';
import './datePicker.css';


function DatePicker (props) {
  const [cells,setCells] = useState([]);
  const [select, setSelect] = useState('yyyy-mm-dd')
  const [y,setYear] = useState(0)
  const [m,setMonth] = useState(0)
  const [d,setDate] = useState(0)
  const [starttop,setStarttop] = useState(0)
  const [totop,setTotop] = useState(0)
  const [drc,setDrc] = useState('')

  useEffect(() => {
    let def;
    if (y === 0 && m === 0 && d === 0 ) {
      def = new Date()
      setYear(def.getFullYear())
      setMonth(def.getMonth() + 1)
      setDate(def.getDate())
      return
    } else {
      def = new Date(y,m-1,d)
    }
    const w = def.getDay() === 0 ? 7 : def.getDay()
    const count = calMonthDays(y, m) // 本月天数
    const permcount = m === 1 ? calMonthDays(y - 1, 12) : calMonthDays(y, m - 1) // 上月总天数
    const perper = m <= 2 ? calMonthDays(y - 1, 10 + m) : calMonthDays(y, m - 2) // 上上月总天数
    const next = m > 11 ? calMonthDays(y + 1, 1) : calMonthDays(y, m + 1) // 下月总天数
    const percount = (7 - (permcount - ((w + d) % 7 - 1))%7)%7 // 需显示的上上月天数
    const nextcount = 42 - next - (count % 7 + (w + d) % 7 - 1) // 需显示的下月总天数
    

    let arr = []
    for(let i = percount - 1; i >= 0; i --) {
      arr.push({
        date: (m < 3 ? y - 1 : y) + '-' + (m < 3 ? 10 + m : m - 2) + '-' + (perper - i),
        d: perper - i,
      })
    }
    for(let i = 1; i <= permcount; i ++) {
      arr.push({
        date: (m < 2 ? y - 1 : y) + '-' + (m < 2 ? 12 : m - 1) + '-' + i,
        d: i,
      })
    }
    for(let i = 1; i <= count; i ++) {
      arr.push({
        date: y + '-' + m + '-' + i,
        d: i,
      })
    }
    for(let i = 1; i <= next; i ++) {
      arr.push({
        date: (m > 11 ? y + 1 : y) + '-' + (m > 11 ? 1 : m + 1) + '-' + i,
        d: i,
      })
    }
    for(let i = 1; i <= nextcount; i ++) {
      arr.push({
        date: (m > 10 ? y + 1 : y) + '-' + (m > 10 ? m - 10 : m + 2) + '-' + i,
        d: i,
      })
    }
    setTotop(0)
    if (drc === '') {
      setTotop(-40 * parseInt((perper + percount)/7))
    }else if (drc === 'up'){
      setStarttop(-400)
      console.log(starttop)
      setTotop(-40 * parseInt((perper + percount)/7))
    }else {
      setStarttop(0)
      setTotop(-40 * parseInt((perper + percount)/7))
    }
    setCells(arr)
  },[y,m,d,totop,drc,starttop])
  
  const M = (m,d) => {
    setTotop(0)
    setDrc(d)
    if (m === 0){
      setYear(y - 1)
      setMonth(12)
    }else if (m === 13){
      setYear(y + 1)
      setMonth(1)
    }else {
      setMonth(m)
    }
  }

  const weeks = ['一','二','三','四','五','六','日'].map( w => <div key={w} className="week-cell">{w}</div>)
  const elcells = cells.map(c => <Cell key={c.date} isSelected={select===c.date} isThisMonth={parseInt(c.date.split('-')[1]) === m} select={() => setSelect(c.date)} value={c.d}/>)

  return (
    
    <div className="d-p">
      <div className="tool">
        <div className="tool-left">{y + '-' + m}</div>
        <div className="tool-right">
          <button onClick={() => M(m-1,'up')}>上月</button>
          <button onClick={() => M(m+1,'down')}>下月</button>
        </div>
      </div>
      <div className="week-line">{weeks}</div>
      <div className="boxbox"><Motion defaultStyle={{top: starttop}} style={{top: spring(totop)}}>{interpolatingStyle => <div className="box" style={interpolatingStyle}>{elcells}</div>}</Motion></div>
    </div>
  )
}

function Cell(props) {
  return <div className={['cell', props.isSelected && 'cell select', !props.isThisMonth &&  'cell-light cell'].join(' ')}  onClick={props.select}>{props.value}</div>
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