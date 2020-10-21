import React, { Suspense, lazy } from 'react';
import { importMDX } from '@mdx-js/react';

const Collapsible = () => {
	const Content = lazy(() => importMDX('../../docs/mdx.md'));

	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<Content />
			</Suspense>
		</div>
	);
};

export default Collapsible;
