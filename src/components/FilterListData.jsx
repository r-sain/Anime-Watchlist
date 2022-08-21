import React from 'react'

export default function FilterListData({genreData,setfilterOption}) {
  return (
    <div>{genreData.map((data,id)=>(
        <button
        key={id}
        onClick={()=>setfilterOption(data)}>{data}</button>
    ))}</div>
  )
}
