import React, { useState } from 'react';
import './MessageInput.css';
import { BiDotsHorizontal } from 'react-icons/bi';

const NewMessage = ({socket}) => {
  const [value, setValue] = useState('');
  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', value);
    setValue('');
  };

  return (
    <form onSubmit={submitForm} > 
      <input  className='msginput'
        autoFocus
        value={value}
        placeholder="Type iChat Message" 
        onChange={(e) => {
          setValue(e.currentTarget.value); 
        }}
        
      />
      
    </form>
    
  );
  
};

export default NewMessage;