module.exports = {
	title: 'React Live-Chess tutorial',
	tagline:
		'Learn React, Socket.io and WebRTC by creating an online multiplayer chess game',
	url: 'https://your-docusaurus-test-site.com',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	favicon: 'img/favicon.ico',
	organizationName: 'facebook', // Usually your GitHub org/user name.
	projectName: 'docusaurus', // Usually your repo name.
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
				{ to: 'blog/', label: 'Blog', position: 'left' },
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
							label: 'Style Guide',
							to: 'docs/introduction',
						},
						{
							label: 'Second Doc',
							to: 'docs/doc2/',
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
							to: 'blog',
						},
						{
							label: 'GitHub',
							href: 'https://github.com/franknmungai/react-hackathon',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} LiveChess, Inc. Built with Docusaurus.`,
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
