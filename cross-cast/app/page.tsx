import { GenericPost } from '@/types/all';
import MessageCard from '../components/MessageCard'

export default async function Home() {

  const data = await (await fetch(process.env.PUBLIC_URL + "/api/github?owner=vercel&repo=next.js")).json() as GenericPost;
  console.log(data, process.env.PUBLIC_URL)
  return (
    <main>
        <h1>Cross Cast</h1>
        {
          data && <p>{JSON.stringify(data)}</p>
        }
        <br/>
        <MessageCard post={data}/>
    </main>
  )
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200){
    throw new Error("Server Error");
  }
  return data;
};