/*
日历组件
*/
import React, { useState } from 'react';
import './Calendar.css'
function Calendar () {
  
  // 初始化日期
  let date = new Date();
  const [y,setY] = useState(date.getFullYear())
  const [m,setM] = useState(date.getMonth()+1)
  const [istr,setIstr] = useState(false)

  let _arr = []   // 日期数组
  let f_arr = [0] // 个月第一条 所在行数 从0开始

  date.setFullYear(y)
  date.setMonth(m-1)
  date.setDate(1);
  
  // 将日期设置为上上月末
  date.setDate(0);
  date.setDate(0);
  // 上上月
  const _d = date.getDate();
  for(let i = date.getDay(); i > 0 ; i-- ){
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (_d - i + 1))
  }
  // 上月
  date.setDate(1);
  if (date.getMonth() >=11) {
    date.setFullYear(date.getFullYear() + 1)
    date.setMonth(0)
  }else{
    date.setMonth(date.getMonth() + 1)
  }
  for(let i = 1; i <= calMonthDays(date.getFullYear(),date.getMonth()+1) ; i++ ){
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + i)
  }
  f_arr.push(parseInt(_arr.length/7))

  // 本月
  date.setDate(1);
  date.setDate(1);
  if (date.getMonth() >=11) {
    date.setFullYear(date.getFullYear() + 1)
    date.setMonth(0)
  }else{
    date.setMonth(date.getMonth() + 1)
  }
  for(let i = 1; i <=  calMonthDays(date.getFullYear(),date.getMonth()+1) ; i++ ){
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + i)
  }
  f_arr.push(parseInt(_arr.length/7))
  
  // 下月
  date.setDate(1);
  date.setDate(1);
  if (date.getMonth() >=11) {
    date.setFullYear(date.getFullYear() + 1)
    date.setMonth(0)
  }else{
    date.setMonth(date.getMonth() + 1)
  }
  for(let i = 1; i <= calMonthDays(date.getFullYear(),date.getMonth()+1) ; i++ ){
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + i)
  }
  // 下下月
  date.setDate(1);
  if (date.getMonth() >=11) {
    date.setFullYear(date.getFullYear() + 1)
    date.setMonth(0)
  }else{
    date.setMonth(date.getMonth() + 1)
  }
  
  let _date = new Date(date.getFullYear(),date.getMonth(),1)
  _date.setDate(0)
  _date.setDate(1)
  
  const count = 42 - calMonthDays(_date.getFullYear(), _date.getMonth()+1) - (_date.getDay() === 0?6:(_date.getDay()-1))
  // const count = 7 - _arr.length % 7
  //console.log(_date.toLocaleDateString(),_date.getDay(),count)
  for(let i = 1; i <= count ; i++ ){
    _arr.push(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + i)
  }
  
  console.log(1);

  // console.log(_arr)
  // style.top
  // let top = -40 * f_arr[1]
  const [top,setTop] = useState(-40 * f_arr[1])
  
  const up = () =>{
    setIstr(true)
      setTop(0)
    setTimeout(() => {
      setIstr(false)
      if (m-1<=0){
        setY(y-1)
        setM(12)
      }else{
        setM(m-1)
      }
      //console.log(m)
      // 上上个月占的行数
      let _data_temp = new Date(y,m-2,1)
      _data_temp.setDate(0)
      _data_temp.setDate(0)
      //console.log(_data_temp.toLocaleDateString(),_data_temp.getDay())
      //console.log(m-2,calMonthDays(y,m-2), _data_temp.getDay(),parseInt((calMonthDays(y,m-2) + _data_temp.getDay()) / 7))
      setTop(-40 * parseInt((calMonthDays(y,m-2) + _data_temp.getDay()) / 7))
    }, 250);
  }
  const down = () =>{
    setIstr(true)
    setTop(-40 * (_arr.length/7-6))
    setTimeout(() => {
      setIstr(false)
      if (m+1>12){
        setY(y+1)
        setM(1)
      }else{
        setM(m+1)
      }
      //console.log(m)
      // 上上个月占的行数
      let _data_temp = new Date(y,m,1)
      _data_temp.setDate(0)
      _data_temp.setDate(0)
      //console.log(_data_temp.toLocaleDateString(),_data_temp.getDay())
      //console.log(m-2,calMonthDays(y,m-2), _data_temp.getDay(),parseInt((calMonthDays(y,m-2) + _data_temp.getDay()) / 7))
      setTop(-40 * parseInt((calMonthDays(y,m) + _data_temp.getDay()) / 7))
    }, 250);
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
  const dates = _arr.map( d => <div key={d} className={['cell',(parseInt(d.split('-')[0])!== y||parseInt(d.split('-')[1])!== m)&&'cell-light'].join(' ')}>{d.split('-')[2]}</div>)
  return(
    <div className="d-p">
      <div className="tool">
        <div className="tool-left">{y}年{m}月</div>
        <div className="tool-right">
          <button className="tool-btn" onClick={up}>∧</button>
          <button className="tool-btn" onClick={down}>∨</button>
        </div>
      </div>
      <div className="week-line">{weeks}</div>
      <div className="boxbox"><div style={{'top': top + 'px' }} className={['box',istr&& 'box-tran'].join(' ')}>{dates}</div></div>
    </div>
  )
}
export default Calendar;
