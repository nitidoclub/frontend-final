import { sanityClient } from "@/lib/sanityClient";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

interface Session {
  _id: string;
  title: string;
  slug: { current: string };
  dj: string;
  date: string;
  tags: string[];
  thumbnail: { asset: { url: string } };
}

export async function getStaticProps() {
  const query = `*[_type == "sesion"] | order(date desc)[0...10] {
    _id,
    title,
    slug,
    dj,
    date,
    tags,
    thumbnail {
      asset -> {
        url
      }
    }
  }`;
  const sessions = await sanityClient.fetch(query);
  return {
    props: {
      sessions,
    },
    revalidate: 60,
  };
}

export default function Home({ sessions }: { sessions: Session[] }) {
  return (
    <>
      <Head>
        <title>Nítido Club</title>
      </Head>
      <main className="bg-white text-black px-4 py-10 max-w-5xl mx-auto font-sans">
        <h1 className="text-4xl font-bold mb-10">Últimas Sesiones</h1>
        <ul className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {sessions.map((s) => (
            <li key={s._id} className="border border-black p-4 rounded-2xl">
              <Link href={`/sesion/${s.slug.current}`}>
                <a className="block group">
                  <div className="aspect-w-1 aspect-h-1 mb-3 overflow-hidden rounded-xl">
                    {s.thumbnail?.asset?.url && (
                      <Image
                        src={s.thumbnail.asset.url}
                        alt={s.title}
                        width={400}
                        height={400}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <h2 className="text-xl font-bold">{s.title}</h2>
                  <p className="text-sm">{s.dj}</p>
                  <p className="text-xs text-gray-500">{new Date(s.date).toLocaleDateString()}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {s.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
