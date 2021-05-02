import useSWR, { mutate } from 'swr';
//import axios from 'axios';
import Link from 'next/link';
//import styles from '../../styles/Home.module.css';

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}
const url = 'https://back-end-warehouseapp.herokuapp.com';
export default function Home(props) {
  const { data, error } = useSWR(url, fetcher, { initialData: props.dados,refreshInterval: 5000});
  if (!data) return <h1>I am loading...</h1>;
  if (error) return <h1>there is an error</h1>;
  const dados  = data;
  //const {dados}  = data;
  return (
    <div>
      {dados.map((arg) => (
        <div key={arg.ID}>
          <h2>
            {arg.ID}-{arg.nome}
          </h2>
          <Link href='/profile/[id]' as={`/profile/${arg.ID}`}>
            <a>{arg.nome}</a>
          </Link>
          <img src={arg.imagem} width="50" />
        </div>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const dados = await fetcher(`https://back-end-warehouseapp.herokuapp.com`);
  //const {dados} = await res.json();

  return {
    props: {
      dados
    },
    revalidate: 20,
  };
};

/*export const getStaticProps = async () => {
  const response = await axios.get(`https://back-end-warehouseapp.herokuapp.com`);
  //const {dados} = await res.json();

  return {
    props: {
      dados: response.data,
    },
    revalidate: 20,
  };
};*/