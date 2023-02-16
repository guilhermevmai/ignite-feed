import styles from './App.module.css'
import { Header } from "./components/Header"
import { Post, PostProps } from './components/Post'
import { Sidebar } from "./components/Sidebar"
import './global.css'


interface PostType extends PostProps{
  id:number
}

function App() {

  const posts:PostType[] = [
    {
      id:1,
      author: {
        name: 'Diego Fernandes',
        avatarUrl: 'https://avatars.githubusercontent.com/u/2254731?v=4',
        role: 'CTO Rocketseat',
      },
      content: [
        {type: 'paragraph', content:'Fala galera!'},
        {type: 'paragraph', content: 'Se liga no meu novo projeto para o portifólio, diretamente da RocketSeat'},
        {type: 'link', content: 'seducaos-em-doces/novidades'},
        {type: 'link', content: '#novoprojeto'}, 
      ],
      publishedAt: new Date('2023-02-14 20:00:00'),
    },
    {
      id:2,
      author: {
        name: 'Guilherme Mai',
        avatarUrl: 'https://gitlab.com/uploads/-/system/user/avatar/7423453/avatar.png' ,
        role: 'Web Developer',
      },
      content: [
        {type: 'paragraph', content:'Fala galera!'},
        {type: 'paragraph', content: 'Se liga no meu novo projeto para o portifólio, diretamente da RocketSeat'},
        {type: 'link', content: 'seducaos-em-doces/novidades'},
        {type: 'link', content: '#novoprojeto'}, 
      ],
      publishedAt: new Date('2023-02-10 18:00:00'),
    },
    {
      id:3,
      author: {
        name: 'Alysson Vitor',
        avatarUrl: 'https://avatars.githubusercontent.com/u/42443254',
        role: 'Web Developer',
      },
      content: [
        {type: 'paragraph', content:'Fala galera!'},
        {type: 'paragraph', content: 'Se liga no meu novo projeto para o portifólio, diretamente da RocketSeat'},
        {type: 'link', content: 'aplicacao-react/home'},
        {type: 'link', content: '#novoprojeto'}, 
      ],
      publishedAt: new Date('2023-02-14 18:00:00'),
    }
  ]

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
            <Post 
              key={post.id} 
              author={post.author} 
              content={post.content}
              publishedAt={post.publishedAt}
            />
          )})}
        </main>
      </div>
      
    </div>
  )
}

export default App
