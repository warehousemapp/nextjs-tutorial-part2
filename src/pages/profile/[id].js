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
			<Link href="/users">
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
	return {
		// Only `/posts/1` and `/posts/2` are generated at build time
		paths: [ { params: { id: '1' } }, { params: { id: '2' } } ],
		// Enable statically generating additional pages
		// For example: `/posts/3`
		fallback: true
	};
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

