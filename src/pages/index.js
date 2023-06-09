import Head from 'next/head';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import Hero from '../../components/Hero';
import Posts from '../../components/Posts';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Blog Site</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero />
      <section className='container posts sm:mt-10 mt-20' id='blogs'>
        {posts.map((post, index) => {
          return <Posts posts={post} key={index} />;
        })}
      </section>
    </>
  );
}

export const getStaticProps = async () => {
  // Get Files from Post Directory
  const files = fs.readdirSync(path.join('posts'));

  // Get Slug and Frontmatter from Posts
  const posts = files.map((filename) => {
    // Create Slug
    const slug = filename.replace('.md', '');
    // Create Frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });
  return {
    props: {
      posts: posts.sort((a, b) => {
        return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
      }),
    },
  };
};
