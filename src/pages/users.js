import { useState } from 'react'
import useSWR from 'swr';
//import axios from 'axios';
import Link from 'next/link';
//import Image from 'next/image'
//import styles from '../../styles/Home.module.css';

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}
const url = 'https://back-end-warehouseapp.herokuapp.com';
export default function Home(props) {

  const [busca, setBusca] = useState('');

  const lowerBusca = busca.toLowerCase()
  const { data, error } = useSWR(url, fetcher, { initialData: props.dados });
  if (!data) return <h1>I am loading...</h1>;
  if (error) return <h1>there is an error</h1>;
  const dados = data.filter((item) => item.nome.toLowerCase().includes(lowerBusca));
  //const {dados}  = data;
  //console.log(data)
  return (
    <>
      <div>
        <h1>Busca</h1>
        <input
          type="text"
          value={busca}
          onChange={(ev) => setBusca(ev.target.value)}
        />
      </div>
      <div>
        {dados.map((arg) => (
          <div key={arg.ID}>
            <h2>
              {arg.ID}-{arg.nome}-{arg.rowNumber}
            </h2>
            <Link key={arg.ID} href='/profile/[id]' as={`/profile/${arg.ID}`}>
              <a>{arg.nome}</a>
            </Link>

          </div>
        ))}
      </div>
    </>
  );
}

//export const getSeverSideProps = async () => {
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