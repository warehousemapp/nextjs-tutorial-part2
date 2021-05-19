import { useRouter } from 'next/router';
import Link from 'next/link';

function Post({ post }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <Link href="/">
          <a>
            <h1>Home</h1>
          </a>
        </Link>
      </div>
      <div>
        <img src={post.imagem} width="50" />
        <p>{post.ID}</p>
        <p>{post.nome}</p>
        <p>{post.slug}</p>
      </div>
    </>
  );
}

/* // This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3001/teste')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.ID },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}
 */

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true
  };
}

/* // This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`http://localhost:3001/user/${params.id}`)
  const post = await res.json()

  // Pass post data to the page via props
  return { props: { post } }
} */

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://back-end-warehouseapp.herokuapp.com/user/${params.id}`
  );
  const post = await res.json();

  // Pass post data to the page via props
  return {
    props: { post },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1
  };
}
export default Post;
