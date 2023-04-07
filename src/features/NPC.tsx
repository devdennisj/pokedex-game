//import { useParams } from 'react-router-dom';
import { FormEventHandler, useState } from 'react';
import Prose from '../components/Prose';

const NPCData = {
  intro: {
    description: 'Hello there! Would you mind helping me?',
    options: ['helping'],
  },
};

function NPC() {
  //let { id } = useParams();

  const [userInput, setUserInput] = useState('');

  const handleInput = (e: HTMLFormElement) => {
    e?.preventDefault();
    console.log(userInput);
  };

  return (
    <div className='mx-8 mt-4 max-w-[400px]'>
      <Prose>
        <h1 className='capitalize'>NPC Name</h1>
        <div className='chat chat-start'>
          <div className='chat-bubble'>Hello there!</div>
        </div>
        <div className='chat chat-end'>
          <div className='chat-bubble'>What's going on?</div>
        </div>
      </Prose>
      <div className='form-control w-full mt-8'>
        <form onSubmit={(e) => handleInput(e)}>
          <input
            type='text'
            placeholder='Type here'
            value={userInput}
            onChange={({ currentTarget }) => setUserInput(currentTarget.value)}
            className='input input-bordered w-full'
          />
        </form>
      </div>
    </div>
  );
}

export default NPC;
