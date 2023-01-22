import { GenericPost } from '../types/all'
import MainContainer from '@/components/MainContainer';

export default async function Home() {
  const data = await (await fetch(`${process.env.PUBLIC_URL}/api/twitter?days=7&user=potus`)).json() as GenericPost[];
  console.log(JSON.stringify(data));

  return (
    <main>
        <MainContainer posts={data} />
    </main>
  )
}
