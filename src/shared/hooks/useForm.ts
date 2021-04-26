import { useState } from 'react';

export function useForm<T>(initialObject: T) :[T, (property: keyof T, value: any) => void ] {
  const [object, setObject] = useState(initialObject);
  function SetObjectValue(property: keyof T, value: any) {
    const temp = object;
    object[property] = value;
    setObject({ ...temp });
  }
  return [object, SetObjectValue];
}
