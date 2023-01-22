import { GenericPost } from '../types/all'
import MessageCardContainer from '../components/MessageCardContainer'

export default async function Home() {

  const data = await (await fetch(process.env.PUBLIC_URL + "/api/github?owner=vercel&repo=next.js")).json() as GenericPost;
  return (
    <main>
        <MessageCardContainer post={data}/>
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