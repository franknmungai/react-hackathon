import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
	{
		title: 'Project based',
		imageUrl: 'img/undraw_docusaurus_mountain.svg',
		description: (
			<>
				In this tutorial, we will be creating a chess game that allows players
				to play online, and even communicate with each other through video chat.
				This will make it a truly live game experience.
				<h4>
					View the finished application{' '}
					<a href="https://friendlychat-a2335.firebaseapp.com/" target="_blank">
						here
					</a>
				</h4>
			</>
		),
	},
	{
		title: 'Easy to follow',
		imageUrl: 'img/undraw_docusaurus_tree.svg',
		description: (
			<>
				All you need is an intermdiate understanding of JavaScript. Not familiar
				with React or socket.io? No worries. All the React and Node.js concepts
				will be explained along the way, step by step. Everything will be broken
				down clearly and easy to grasp.
			</>
		),
	},
	{
		title: 'What you will learn',
		imageUrl: 'img/undraw_docusaurus_react.svg',
		description: (
			<>
				By the end of this tutorial, you will be familiar with React basics such
				as Components, props and state and hooks such as <code>useState</code>{' '}
				<code>useEffect</code> <code>useRef</code> <code>useReducer</code>.
				Creating Layouts with <code>CSS Grid</code> How to use{' '}
				<code>socket.io</code> and so much more. Let's get started.
			</>
		),
	},
];

function Feature({ imageUrl, title, description }) {
	const imgUrl = useBaseUrl(imageUrl);
	return (
		<div className={clsx('col col--4', styles.feature)}>
			{imgUrl && (
				<div className="text--center">
					<img className={styles.featureImage} src={imgUrl} alt={title} />
				</div>
			)}
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
}

function Home() {
	const context = useDocusaurusContext();
	const { siteConfig = {} } = context;
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<header className={clsx('hero hero--primary', styles.heroBanner)}>
				<div className="container">
					<h1 className="hero__title">{siteConfig.title}</h1>
					<p className="hero__subtitle">{siteConfig.tagline}</p>
					<div className={styles.buttons}>
						<Link
							className={clsx(
								'button button--outline button--secondary button--lg',
								styles.getStarted
							)}
							to={useBaseUrl('docs/introduction')}
						>
							Get Started
						</Link>
					</div>
				</div>
			</header>
			<main>
				{features && features.length > 0 && (
					<section className={styles.features}>
						<div className="container">
							<div className="row">
								{features.map((props, idx) => (
									<Feature key={idx} {...props} />
								))}
							</div>
						</div>
					</section>
				)}
			</main>
		</Layout>
	);
}

export default Home;
