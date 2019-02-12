import React from 'react'

const HearthSVG = ({ filled, style, handleClick, id }) =>
  (
    <svg onClick={(event) => handleClick(event, id)} style={style} viewBox='0 0 350 700' xmlns='http://www.w3.org/2000/svg' width='35' height='35'>
      <g style={{ transition: '300ms ease-out' }} stroke='#f00' strokeWidth='20' fill={filled ? '#ff0000cc' : '#ff000000'}>
        <path d='M140,20C 73,20 20,74 20,140 20,275 156,310 248,443 336,311 477,270 477,140 477,74 423,20 357,20 309,20 267,48 248,89 229,48 188,20 140,20Z' />
      </g>
    </svg>
  )

export default HearthSVG
