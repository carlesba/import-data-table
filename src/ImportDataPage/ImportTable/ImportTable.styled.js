import { useState } from 'react'
import { styled } from 'Styled'

const Stable = styled('table', {
  maxHeight: '100%',
  paddingBottom: 40
})
export function Table({ head, children }) {
  return (
    <Stable>
      <thead><tr>{head}</tr></thead>
      <tbody>{children}</tbody>
    </Stable>
  )
}

const Tr = styled('tr', {
  ":hover button": {
    opacity: 1
  }
})
const ActionButton = styled('button', {
  background: 'transparent',
  border: 'none',
  padding: "2px 8px",
  borderRadius: 4,
  fontWeight: 'bold',
  outline: 'none',
  opacity: 0,
  ':hover': {
    color: "red",
    cursor: 'pointer',
    boxShadow: '0 0 3px 1px rgba(140, 140, 140, 0.4)',
  },
  ":active": {
    color: "#a00000",
    boxShadow: '0 0 0 1px rgba(140, 140, 140, 0.4)',
  }
})
export function Row({ children, onRemove }) {
  return (
    <Tr data-testid='item-row'>
      {children}
      <td>
        <ActionButton data-testid='remove-item' onClick={onRemove}>remove</ActionButton>
      </td>
    </Tr>
  )
}

export const Header = styled('th', {
  textAlign: "right",
  whiteSpace: 'nowrap',
  paddingRight: 10,
  position: 'sticky',
  top: 0,
  background: 'white',
  zIndex: 1
})

const Td = styled('td', {
  height: 35,
  width: "5%",
  position: 'relative'
})
const Input = styled('input', {
  width: '100%',
  border: '2px solid transparent',
  outline: 'none',
  textAlign: 'right',
  padding: "0 10px",
  height: 35,
  borderRadius: 7,
  boxSizing: 'border-box',
  ":hover": {
    background: '#d7efff'
  },
  ":focus": {
    borderColor: "#434343",
    boxShadow: '1px 1px 6px rgba(100, 100, 100, 0.4) inset',
  },
  variants: {
    error: {
      true: {
        background: '#ffe5e5',
        ':focus': {
          borderColor: 'red',
        },
        ":hover": {
          borderColor: 'red',
          background: '#ffe5e5',
        },
      }
    },
    empty: {
      true: {
        background: '#efefef'
      }
    }
  }
})
Input.compoundVariant(
  { error: true, empty: true, },
  { background: '#ffe5e5' }
)
const CellError = styled('div', {
  lineHeight: "15px",
  textAlign: 'right',
  fontSize: 10,
  color: 'red',
  boxSizing: 'border-box',
  padding: '1px 5px',
  position: 'absolute',
  right: 0,
  bottom: 0,
  zIndex: 1,
  background: 'white',
  borderRadius: 7,
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
  boxShadow: '0 1px 4px rgba(100, 100, 100, 0.2)',
  transform: "translateY(100%)"
})
export function Cell({ value, onChange, error }) {
  const [state, setState] = useState(value)
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const errorShown = !!error && (focused || hovered)

  return (
    <Td
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Input
        type="text"
        value={state}
        onChange={(event) => setState(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          onChange(state)
          setFocused(false)
        }}
        error={!!error}
        empty={!value}
      />
      {errorShown && <CellError>{error}</CellError>}
    </Td>
  )
}

