module.exports = {
	title: 'React Live-Chess tutorial',
	tagline:
		'Learn JavaScript, React, Node.js and Socket.io by creating an online multiplayer chess game',
	url: 'https://stack-chess-tutorial.netlify.app/',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	favicon: 'img/favicon.ico',
	organizationName: 'franknmungai', // Usually your GitHub org/user name.
	projectName: 'react-hackathon', // Usually your repo name.
	themeConfig: {
		navbar: {
			title: 'React Live-Chess',
			logo: {
				alt: 'My Site Logo',
				src: 'img/logo.svg',
			},
			items: [
				{
					to: 'docs/introduction',
					activeBasePath: 'docs',
					label: 'Learn',
					position: 'left',
				},
				{
					to: 'https://stack-chess.netlify.app/',
					label: 'Demo',
					position: 'left',
				},
				{
					href: 'https://github.com/franknmungai/react-hackathon',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{
							label: 'Introduction',
							to: 'docs/introduction',
						},
						{
							label: 'Getting Started',
							to: 'docs/01-get-started',
						},
					],
				},
				{
					title: 'Code',
					items: [
						{
							label: 'GitHub',
							to: 'https://github.com/franknmungai/live-chess',
						},
						{
							label: 'Gists',
							to: 'https://gist.github.com/franknmungai',
						},
						{
							label: 'Live App',
							to: 'https://stack-chess.netlify.app/',
						},
					],
				},
				// {
				// 	title: 'Authors',
				// 	items: [
				// 		{
				// 			label: 'Frank Mungai',
				// 			href: 'https://github.com/franknmungai',
				// 		},
				// 		{
				// 			label: 'Collins Kesuibai',
				// 			href: 'https://github.com/collinskesuibai',
				// 		},
				// 		{
				// 			label: 'June Awuor',
				// 			href: 'https://github.com/AwuorJune',
				// 		},
				// 	],
				// },

				{
					title: 'Community',
					items: [
						{
							label: 'Blog',
							to: 'https://frank-ng.netlify.app/',
						},
						{
							label: 'GitHub',
							href: 'https://github.com/franknmungai/react-hackathon',
						},
						{
							label: 'Twitter',
							href: 'https://twitter.com/FrankMungaiN',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} StackChess. Built with Docusaurus.`,
		},
	},
	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
					// Please change this to your repo.
					editUrl: 'https://github.com/franknmungai/react-hackathon',
				},
				blog: {
					showReadingTime: true,
					// Please change this to your repo.
					editUrl: 'https://github.com/franknmungai/react-hackathon',
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			},
		],
	],
};
