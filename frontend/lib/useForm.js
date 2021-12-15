import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  function handleChange(e) {
    // copy existing state and overwrite the value of the specified key
    let { value, name, type } = e.target;
    if (type === 'number') {
      // HTML automatically converts number to text so we coerce back to number
      value = parseInt(value);
    }
    if (type === 'file') {
      // take the first element of the `e.target.files` array and store in value
      [value] = e.target.files;
    }
    setInputs({ ...inputs, [name]: value });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
