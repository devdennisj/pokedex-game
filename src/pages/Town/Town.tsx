import CharacterCard from './CharacterCard';

function Town() {
  return (
    <div className='flex flex-row'>
      <div>
        <ul className='menu w-56'>
          <li>
            <a>Town Square</a>
          </li>
          <li className='disabled'>
            <a>City Hall</a>
          </li>
        </ul>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        <CharacterCard
          name='Placeholder name'
          description='This is an NPC you can interact with. Try talking to them'
        />
      </div>
    </div>
  );
}

export default Town;
