
import React, { useState} from 'react';
import './datePicker.css';

function DatePicker (props) {


  const [select, setSelect] = useState('yyyy-mm-dd')
  const [y,setYear] = useState(props.y || new Date().getFullYear())
  const [m,setMonth] = useState(props.m || new Date().getMonth() + 1)
  const [d,setDate] = useState(props.d || new Date().getDate())
  const [showmonth, setShowmontht] = useState(y*12+m)
  const [totop,setTotop] = useState(-1)
  const [drc,setDrc] = useState('')


    // 为了实现动画 分三块 cells 
    const [cells1,setCells1] = useState(calCellArr(y,m));
    const [cells2,setCells2] = useState(m === 1 ? calCellArr(y - 1, 12) : calCellArr(y, m - 1));
    const [cells3,setCells3] = useState(m === 12 ? calCellArr(y + 1, 1) : calCellArr(y, m + 1));



    // console.log(1111)
    // console.log(2222,calCellArr(y,m))
    // setCells1(1)
    // console.log(3333,cells1)
    // if (m === 1) {
    //   setCells2(calCellArr(y - 1, 12))
    // }else {
    //   setCells2(calCellArr(y, m - 1))
    // }
    
    // if (m === 12) {
    //   setCells3(calCellArr(y + 1, 1))
    // }else {
    //   setCells3(calCellArr(y, m + 1))
    // }
  
    useEffect(()=>{
      console.log(11)
      if (drc === 'up'){
        setShowmontht(m === 1 ? (y - 1)*12 + 12 : y * 12 + m - 1)
        setYear(m === 1 ? (y - 1):y)
        setMonth(m === 1 ? 12 : m - 1)
        console.log(cells1.key - (y*12+m),y,m,[{v:cells1,m:setCells1},{v:cells2,m:setCells2},{v:cells3,m: setCells3}])
        if (cells1.key - (y*12+m) === 1){
          setCells1((m-2<=0) ? (y-1) : y, (m-2<=0) ? (12+m-2) : (m-2))
        }else if(cells2.key - (y*12+m)){
          setCells2((m-2<=0) ? (y-1) : y, (m-2<=0) ? (12+m-2) : (m-2))
        }else if (cells1.key - (y*12+m)){
          setCells3((m-2<=0) ? (y-1) : y, (m-2<=0) ? (12+m-2) : (m-2))
        }

      }
      if (drc === 'down'){
        setShowmontht(m === 12 ? (y + 1)*12 + 1 : y * 12 + m + 1)
        setYear(m === 12 ? (y + 1):y)
        setMonth(m === 12 ? 1 : m + 1)
      }
    },[drc])
  
 
    const boxs = [cells1,cells2,cells3].map(x => <div key={x.key} className={['box', showmonth===x.key && 'show-box'].join(' ')} style={{top: ((x.key-showmonth)*x.len*40) +'px'}}>{x.value.map(c =>{
      return <Cell key={x.key + c.date} isSelected={select===c.date} isThisMonth={parseInt(c.date.split('-')[1]) === m} select={() => setSelect(c.date)} value={c.d}/>
    })}</div>)


  const weeks = ['一','二','三','四','五','六','日'].map( w => <div key={w} className="week-cell">{w}</div>)


  
  
  
  return (
    
    <div className="d-p">
      <div className="tool">
        <div className="tool-left">{y + '-' + m}</div>
        <div className="tool-right">
          <button className="tool-btn" onClick={() => setDrc('up')}>∧</button>
          <button className="tool-btn" onClick={() => setDrc('down')}>∨</button>
        </div>
      </div>
      <div className="week-line">{weeks}</div>
      <div className="boxbox">
         {boxs}
      </div>
    </div>
  )
}

function Cell(props) {
  return <div className={['cell', props.isSelected && 'cell select', !props.isThisMonth &&  'cell-light cell'].join(' ')}  onClick={props.select}>{props.value}</div>
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

// 计算出cell arr 
function calCellArr(y,m) {
  // console.log(y,m)
  // 记录 每月1号所在行 （从0开始）
  let kline = []
  let arr = []
  let _date = new Date()
  _date.setFullYear(y)
  _date.setMonth(m-1)
  _date.setDate(1)
  // c1 应添加到arr 上个月天数 ， c2 这个月， c3 下个月
  let c1 = (_date.getDay() - 1 < 0) ? 7 : (_date.getDay() - 1)
  _date.setDate(0)
  let last = _date.getDate()
  while (c1 > 0) {
    arr.push({
      date:  _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + (last - c1 + 1),
      d: last - c1 + 1
    })
    c1--
  }

  _date.setFullYear(y)
  _date.setDate(1)
  _date.setMonth(m-1)
  let c2 = calMonthDays(y,m)
  let i = 1
  while (i <= c2) {
    arr.push({
      date:  _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + i,
      d: i
    })
    i++
  }

  let leng = parseInt(arr.length/7)
  // console.log(leng)

  _date.setDate(c2+1)
  let c3 = 42 - arr.length
  let j = 1
  while (j <= c3) {
    arr.push({
      date:  _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + j,
      d: j
    })
    j++
  }
  return {key: (y*12 + m),value:arr,len:leng}
}

export default DatePicker