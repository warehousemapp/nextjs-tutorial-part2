import { useState } from "react";
import useSWR from "swr";
//import axios from 'axios';
import Link from "next/link";
//import Image from 'next/image'
//import styles from '../../styles/Home.module.css';

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function Home(props) {
  const [busca, setBusca] = useState("");
  const [per_page, setPer_page] = useState(100);
  const [page, setPage] = useState(1);

  const lowerBusca = busca.toLowerCase();
  const {
    data,
    error
  } = useSWR(
    `https://back-end-warehouseapp.herokuapp.com/teste/?per_page=${per_page}&page=${page}&search=${lowerBusca}`,
    fetcher,
    { initialData: props.dados }
  );
  if (!data) return <h1>I am loading...</h1>;
  if (error) return <h1>there is an error</h1>;
  const dados = data;
  const total = data.length;

  const totalPages = Math.ceil(total / per_page);

  const arrayPages = [];
  for (let i = 1; i <= totalPages; i++) {
    arrayPages.push(i);
  }

  const nPages = [...arrayPages].length;
  console.log(nPages);
  return (
    <>
      <div>
        <div>
          <h1>Busca</h1>
          <input
            type="text"
            value={busca}
            onChange={(ev) => setBusca(ev.target.value)}
          />
        </div>
        <div>
          <h1>Limit</h1>

          <select
            value={per_page}
            onChange={(ev) => setPer_page(ev.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="100">100</option>
          </select>
        </div>
        {total}
        <div>
          {arrayPages.map((n_page) => (
            <button value={page} onChange={(ev) => setPage(ev.target.value)}>
              {n_page}
            </button>
          ))}
          <h1>Páginas</h1>
          <input
            min="1"
            max={nPages}
            type="text"
            value={page}
            onChange={(ev) => setPage(ev.target.value)}
          />
        </div>
      </div>
      <div>
        {dados.map((arg) => (
          <div key={arg.ID}>
            <h2>
              {arg.ID}-{arg.nome}-{arg.rowNumber - 1}
            </h2>
            <Link key={arg.ID} href="/profile/[id]" as={`/profile/${arg.ID}`}>
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
  const dados = await fetcher(
    `https://back-end-warehouseapp.herokuapp.com/teste`
  );
  //const {dados} = await res.json();

  return {
    props: {
      dados
    },
    revalidate: 20
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
