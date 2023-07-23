import Moive from "./Moive"
import "../styles/moive_container.css"

export default async function Home() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  )
  const res = await data.json()
  return (
    <main>
      <div className="movie-container">
        {res.results.map(moive => (
          <Moive
            key={moive.id}
            id={moive.id}
            title={moive.title}
            poster_path={moive.poster_path}
            rerelease_date={moive.rerelease_date}
          />
        ))}
      </div>
    </main>
  )
}
