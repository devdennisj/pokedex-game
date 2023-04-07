import { useNavigate } from 'react-router-dom';

function StartPage() {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/game")
	}

	return (
		<>
			<div className="hero min-h-screen bg-base-200">
				<div className="hero-content">
					<div className="max-w-2xl">
						<article className="prose lg:prose-lg text-center">
							<h1 className='uppercase'>Pokecatcher</h1>
							<p>
								A mini game to explore the wilds and collect pokemon for your pokedex.
								This is not made in affiliation with Nintendo or The Pokemon Company and is not monetized in any way
							</p>
							<button className="btn btn-primary" onClick={handleClick}>Play now</button>
						</article>
					</div>
				</div>
			</div>


			<div className='flex flex-row justify-center gap-16  mt-32'>
				<div className="card w-96 bg-base-100 shadow-md">
					<figure><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png" alt="Shoes" /></figure>
					<div className="card-body">
						<h2 className="card-title">Explore!</h2>
						<p>Find new pokemon in the wild</p>
					</div>
				</div>

				<div className="card w-96 bg-base-100 shadow-md">
					<figure><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png" alt="Shoes" /></figure>
					<div className="card-body">
						<h2 className="card-title">Collect!</h2>
						<p>Collect them for your pokedex</p>
					</div>
				</div>

				<div className="card w-96 bg-base-100 shadow-md">
					<figure><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png" alt="Shoes" /></figure>
					<div className="card-body">
						<h2 className="card-title">Learn!</h2>
						<p>Add to them to your pokedex and find out more about them</p>
					</div>
				</div>
			</div>
			<footer className='mx-auto max-w-7xl grid grid-cols-4 gap-4 prose'>
				<div className='flex flex-col'>
					<h4>Socials</h4>
				</div>
				<div className='flex flex-col'>
					<h4>Links</h4>
				</div>
				<div className='flex flex-col'>
					<h4>Links</h4>
				</div>
				<div className='flex flex-col'>
					<h4>Links</h4>
				</div>
			</footer>
		</>
	)
}

export default StartPage