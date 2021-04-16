import { useState } from 'react';

export function useForm(initialObject: any) {
  const [object, setObject] = useState(initialObject);
  function SetObjectValue(property: any, value: any) {
    const temp = object;
    object[property] = value;
    setObject({ ...temp });
  }
  return [object, SetObjectValue];
}
