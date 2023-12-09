import { Button, Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectWindow } from '../features/windowSlice'

interface Size {
  width: number,
  height: number
}

export const YoutubeVideo = () => {
  const [input, setInput] = useState("")
  const [sourceUrl, setsourceUrl] = useState("")
  const currentRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<Size>(getSizeParent())


  const submitUrl = async () => {
    setsourceUrl(`https://www.youtube.com/embed/${input}`)
    setSize(getSizeParent())
  } 

  useEffect(() => {
    let updateSize = () => setSize(getSizeParent())
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])
  

  if (!sourceUrl) {
    return (
      <div ref={currentRef}>
        <Input defaultValue={input} onChange={e => setInput(e.target.value.trim())} />
        <Button onClick={submitUrl}>Go</Button>
      </div>
    )
  }
  return (
    <div ref={currentRef}>
      <iframe 
        width={size.width-40} 
        height={size.height-40} 
        src={sourceUrl}
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen={true}
      />
    </div>
  )
}

const getSizeParent = () => {
  let contentElement = document.getElementById('my-content')
  let width = contentElement?.clientWidth || 0;
  let height = contentElement?.clientHeight || 0;
  console.log({width, height})
  return {width, height}
}
