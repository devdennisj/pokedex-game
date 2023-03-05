import { useNavigate } from 'react-router-dom';

interface CharacterCardProps {
  name: string;
  description: string;
}

function CharacterCard({ name, description }: CharacterCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/game/npc/1');
  };

  return (
    <div className='card w-96 bg-base-100 shadow-md'>
      <div className='card-body prose'>
        <h2 className='mb-0 capitalize'>{name}</h2>
        <p>{description}</p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary' onClick={handleClick}>
            Talk to
          </button>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
