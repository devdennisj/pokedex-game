import classNames from 'classnames';
import { ReactNode } from 'react';

interface ProseProps {
	children: ReactNode;
	className: string;
}

function Prose({ children, className }: ProseProps) {
	return (
		<article className={classNames(['prose', className])}>
			{children}
		</article>
	);
}

export default Prose;
