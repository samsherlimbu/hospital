'use client'
import { changeBackgroundColor, changeHeight, changeShape, changeWidth, decrementHeight, decrementWidth } from '@/redux/reducerSlices/boxSlice'
import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'





const Box = () => {
    const {height, width, backgroundColor,borderRadius} = useSelector(state=>state.box)
    const dispatch = useDispatch();
  return (
    <div>
      <div style={{backgroundColor: backgroundColor, height: height, width:width,borderRadius:borderRadius }}>
        
      </div>
     <Button onClick={()=>dispatch(changeWidth())}>+width</Button>
     <Button onClick={()=>dispatch(decrementWidth())}>-width</Button>
     <Button onClick={()=>dispatch(changeHeight())}>+Height</Button>
     <Button onClick={()=>dispatch(decrementHeight())}>-Height</Button>
     <Button onClick={()=>dispatch(changeShape())}>Change to circle</Button>
     <Input onChange={(e)=>dispatch(changeBackgroundColor(e.target.value))} placeholder='enter color' />
    </div>
  )
}

export default Box