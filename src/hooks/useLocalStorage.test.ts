import {useLocalStorage} from './useLocalStorage';
import {act, renderHook} from '@testing-library/react';

describe('useLocalStorage', () => {
  const getValue = () => JSON.parse(window.localStorage.getItem('someKey')!);

  afterEach(() => {
    window.localStorage.clear();
  });

  it('correctly handles strings', () => assertLocalStorage('foo', 'bar'));
  it('correctly handles numbers', () => assertLocalStorage(21, 37));
  it('correctly handles booleans', () => assertLocalStorage(true, false));
  it('correctly handles arrays', () => assertLocalStorage(['foo'], ['bar']));
  it('correctly handles objects', () => assertLocalStorage({foo: 'bar'}, {bar: 'baz'}));

  const assertLocalStorage = <T>(initialValue: T, newValue: T) => {
    const {result} = renderHook(() => useLocalStorage<T>('someKey', initialValue));
    const [value, setValue] = result.current;

    expect(value).toEqual(initialValue);
    expect(getValue()).toEqual(initialValue);

    // Update hook value
    act(() => setValue(newValue));

    expect(result.current[0]).toEqual(newValue);
    expect(getValue()).toEqual(newValue);
  };
});
