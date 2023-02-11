import { useQuery } from "@tanstack/react-query";

import { fetchPokemon } from "../../../data/pokemon";

function Encounter({ id }: { id: number }) {
	const { data } = useQuery({
		queryKey: ["pokemon", id],
		queryFn: () => fetchPokemon(id)
	});

	if (!data) {
		return <></>;
	}
	console.log(data);
	return (
		<div>
			<div className="flex flex-col items-center">
				<img src={data.sprites.front_default} width={150} height={150} />
			</div>
			<article className="prose lg:prose-lg prose-headings:mb-0 prose-p:mt-4">
				<h1 className="capitalize text-[#454545]">{data.name}</h1>
			</article>
		</div>
	);
}

export default Encounter;