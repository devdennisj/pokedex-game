import { useNavigate } from 'react-router-dom';

function StartPage() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/game")
	}

	return (
		<div className='container mx-auto mt-32'>
			<article className="prose lg:prose-lg mx-auto text-center">
				<h1 className='uppercase'>Pokecatcher</h1>
				<p>
					A mini game to explore the wilds and collect pokemon for your pokedex.
					This is not made in affiliation with Nintendo or Th Pokemon Company and is not monetized in any way
				</p>
				<button className="btn btn-primary" onClick={handleClick}>Play now</button>
			</article>
		</div>
	)
}

export default StartPage