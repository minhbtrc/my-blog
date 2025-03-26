import { usePrevious } from 'react-use'

export function useSignalSwitch<T>(value: T) {
  const wire = usePrevious(value)
  const signal = wire === undefined ? value : wire
  return signal !== value
}

export function useSignalEdge<T>(value: T, low: T, high: T) {
  const wire = usePrevious(value)
  const signal = wire === undefined ? low : wire
  return signal === low && value === high
}
