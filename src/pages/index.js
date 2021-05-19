import { useState } from 'react';
import useSWR, { mutate } from 'swr';
//import axios from 'axios';
import Link from 'next/link';
//import Image from 'next/image'
//import styles from '../../styles/Home.module.css';
import SearchInput from './SearchInput';

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function Home(props) {

  const [busca, setBusca] = useState('');
  const [per_page, setPer_page] = useState(100);
  const [page, setPage] = useState(1);
  const lowerBusca = busca.toLowerCase();

  const { data, error } = useSWR(
    `https://back-end-warehouseapp.herokuapp.com/app/?per_page=${per_page}&page=${page}&search=${lowerBusca}`,
    fetcher,
    {
      initialData: props.dados,
      refreshInterval:500
/*       revalidateOnMount: true,
      revalidateOnFocus: true,
      shouldRetryOnError: true,
      focusThrottleInterval: 5000,
      loadingTimeout: 3000 */
    }
  );

  if (!data) return <h1>I am loading...</h1>;
  if (error) return <h1>there is an error</h1>;
  const dados = data;
  
  const totalp = data.length;
  const totalPages = Math.ceil(totalp / per_page);
  const arrayPages = [];
  for (let i = 1; i <= totalPages; i++) {
    arrayPages.push(i);
  }
  const nPages = arrayPages.length;
  //console.log(arrayPages);
  console.log(totalp);
  //console.log(data);
  //console.log(totalPages);
  //console.log(busca);

  return (
    <>
      <div>
        <div>
          <h1>Busca</h1>
          <SearchInput
            
            value={busca}
            onChange={(search) => setBusca(search)}
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
            <option value="810">810</option>
          </select>
        </div>
        {totalp}
        <div>
          {arrayPages.map((n_page) => (
            <button
              key={n_page}
              value={page}
              onClick={(ev) => setPage(ev.target.value)}
            >
              {n_page}
            </button>
          ))}
          <h1>Páginas</h1>
          <input
            min="1"
            max={nPages}
            type="search"
            value={page}
            onChange={(ev) => setPage(ev.target.value)}
          />
        </div>
      </div>
      <div>
        {dados &&
          dados.map(
            (arg) => (
              <div key={arg.ID}>
                <h2>
                  {arg.ID}-{arg.nome}-{arg.rowNumber - 1}
                </h2>
                
                <Link
                  key={arg.ID}
                  href="/profile/[id]"
                  as={`/profile/${arg.ID}`}
                >
                  <a>{arg.slug}</a>
                </Link>
              </div>
            )
          )}
      </div>
    </>
  );
}

//export const getSeverSideProps = async () => {
export const getStaticProps = async () => {
  const dados = await fetcher(
    `https://back-end-warehouseapp.herokuapp.com/app`
  );
  //const {dados} = await res.json();

  return {
    props: {
      dados
    },
    //revalidate: 1
  };
};

/* export const getStaticProps = async () => {
  const response = await axios.get(`https://back-end-warehouseapp.herokuapp.com/teste/?per_page=100&page=1&search=`);
  //const {dados} = await res.json();
  return {
    props: {
      dados: response.data,
    },
    revalidate: 20,
  };
}; */
