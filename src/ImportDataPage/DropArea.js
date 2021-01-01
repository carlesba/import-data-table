import { useState } from "react"
import { styled } from 'Styled'

const Wrapper = styled('div', {
  position: "relative",
  minHeight: '100%',
  variants: {
    fullPage: {
      true: {
        minHeight: '100vh'
      }
    }
  }
})
const Area = styled('div', {
  fontSize: 30,
  color: "white",
  fontWeight: "bold",
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: "#1976d2",
  opacity: 0.7
})

export function DropArea({ children, types, dropMessage, onDrop }) {
  const [areaVisible, setAreaVisible] = useState(false)

  const dragEnterHandler = (event) => {
    const item = event.dataTransfer.items?.[0]
    if (types.includes(item.type) && item.kind === 'file') {
      setAreaVisible(true)
    }
  }
  const dropHandler = async (event) => {
    event.preventDefault()
    const item = event.dataTransfer.items?.[0]
    const file = item.getAsFile()
    await onDrop(file)
    setAreaVisible(false)
  }
  return (
    <Wrapper
      fullPage
      onDragEnter={dragEnterHandler}
      onDragOver={event => { event.preventDefault() }}
    >
      {children}
      {areaVisible && (
        <Area
          onDragLeave={() => setAreaVisible(false)}
          onDrop={dropHandler}
        >{dropMessage}</Area>
      )}
    </Wrapper>
  )
}
