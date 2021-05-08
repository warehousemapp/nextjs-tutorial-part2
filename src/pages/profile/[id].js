// pages/posts/[id].js
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

function Post({ dados }) {
	const router = useRouter();

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<Link href="/">
				<a>
					<h1>Home</h1>
				</a>
			</Link>
			<div>
				{dados.map((post) => (
					<div key={post.ID}>
						<h3>{post.nome}</h3>
						<img src={post.imagem} width="50" />
					</div>
				))}
			</div>
		</div>
	);
}

// This function gets called at build time
export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const res = await fetch('https://back-end-warehouseapp.herokuapp.com')
	const posts = await res.json()
  
	// Get the paths we want to pre-render based on posts
	const paths = posts.map((post) => ({
	  params: { id: post.ID },
	}))
  
	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: true }
  }

export const getStaticProps = async ({ params }) => {
  const response = await axios.get(`https://back-end-warehouseapp.herokuapp.com/user/${params.id}`);
  //const {dados} = await res.json();

  return {
    props: {
      dados: response.data,
    },
    revalidate: 20,
  };
};
export default Post;

