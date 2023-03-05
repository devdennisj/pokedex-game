//import { useParams } from 'react-router-dom';
import Prose from '../components/Prose';

function NPC() {
  //let { id } = useParams();

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
        <input
          type='text'
          placeholder='Type here'
          className='input input-bordered w-full'
        />
      </div>
    </div>
  );
}

export default NPC;
