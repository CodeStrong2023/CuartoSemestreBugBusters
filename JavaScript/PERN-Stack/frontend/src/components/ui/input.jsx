import { forwardRef } from 'react';

export const Input = forwardRef(function InputComponent(props, ref) {
  return (
    <input 
      ref={ref} 
      type="text" 
      className="bg-zinc-800 px-3 py-2 block my-2 w-full" 
      {...props}
    />
  );
});
export default Input