/*
日历组件
*/
import React, { useState,useEffect } from 'react';
import './Calendar.css'
function Calendar () {

  // 初始化日期
  let date = new Date();
  const [y,setY] = useState(date.getFullYear())
  const [m,setM] = useState(date.getMonth()+1)
  date.setFullYear(y)
  date.setMonth(m-1)
  

  let _arr = []   // 日期数组
  let f_arr = [0] // 个月第一条 所在行数 从0开始
  // 将日期设置为上上月末
  date.setDate(0);
  date.setDate(0);
  
  // 上上月
  for(let i = date.getDay(); i > 0 ; i-- ){
    date.setDate(-i);
    date.setMonth(date.getMonth() + 1)
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
  }
  // 上月
  date.setDate(1);
  date.setMonth(date.getMonth() + 1)
  for(let i = 1; i <= calMonthDays(date.getFullYear(),date.getMonth()+1) ; i++ ){
    date.setDate(i);
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
  }
  f_arr.push(parseInt(_arr.length/7))

  // 本月
  date.setDate(1);
  date.setMonth(10)
  for(let i = 1; i <=  calMonthDays(date.getFullYear(),date.getMonth()+1) ; i++ ){
    date.setDate(i);
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
  }
  f_arr.push(parseInt(_arr.length/7))
  
  // 下月
  date.setDate(1);
  date.setMonth(date.getMonth() + 1)
  for(let i = 1; i <= calMonthDays(date.getFullYear(),date.getMonth()+1) ; i++ ){
    date.setDate(i);
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
  }
  // 下下月
  date.setDate(1);
  date.setMonth(date.getMonth() + 1)
  const count = 7 - _arr.length % 7
  for(let i = 1; i <= count ; i++ ){
    date.setDate(i);
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
  }

  // console.log(_arr)
  // style.top
  // let top = -40 * f_arr[1]
  const [top,setTop] = useState(-40 * f_arr[1])
  let [istr,setIstr] = useState(false)
  
  const up = () =>{
    setIstr(true)
      setTop(0)
    setTimeout(() => {
      setIstr(false)
      setM(m-1)
      // 上上个月占的行数
      let _data_temp = new Date()
      _data_temp.setMonth(m-2)
      _data_temp.setDate(0)
      console.log(m-2,calMonthDays(y,m-2), _data_temp.getDay(),parseInt((calMonthDays(y,m-2) + _data_temp.getDay()) / 7))
      setTop(-40 * parseInt((calMonthDays(y,m-2) + _data_temp.getDay()) / 7))
    }, 1000);
  }

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
  

  const weeks = ['一','二','三','四','五','六','日'].map( w => <div key={w} className="week-cell">{w}</div>)
  const dates = _arr.map( d => <div key={d} className="cell cell-light">{d.split('-')[2]}</div>)
  return(
    <div className="d-p">
      <div className="tool">
        <div className="tool-left">{y}-年-{m}月</div>
        <div className="tool-right">
          <button className="tool-btn" onClick={up}>∧</button>
          <button className="tool-btn">∨</button>
        </div>
      </div>
      <div className="week-line">{weeks}</div>
      <div className="boxbox"><div style={{'top': top + 'px' }} className={['box',istr&& 'box-tran'].join(' ')}>{dates}</div></div>
    </div>
  )
}
export default Calendar;
