import Image from "next/image"
import Link from "next/link"

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  )
  const res = await data.json()
  return res.results.map(movie => ({
    movie: toString(movie.id),
  }))
}

export default async function MovieDetails({ params }) {
  const { movie } = params
  const imagePath = "https://image.tmdb.org/t/p/original"
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
  )
  const res = await data.json()

  const genreNames = res.genres ? res.genres.map(genre => genre.name) : []
  const genresWithCommas = genreNames.join(", ")

  const originalLanguage = res.original_language
    ? res.original_language.toUpperCase()
    : ""

  // Check if res.budget is defined before using toLocaleString
  const budget = res.budget ? res.budget.toLocaleString() : ""

  return (
    <div>
      <div>
        <h2 className="movie-detail_font">{res.title}</h2>
        <h1>Language: {originalLanguage}</h1>
        <h1>{res.release_date}</h1>
        <h2>Runtime: {res.runtime} minutes</h2>
        {/* Use the variable budget */}
        <h3>Movie Budget: ${budget}</h3>
        <h1>Genres: {genresWithCommas}</h1>
        <h1>Popularity: {res.popularity}</h1>
        <h1>Revenue: ${res.revenue.toLocaleString()}</h1>
        <br />
        <h2 className="movie_status">{res.status}</h2>
        <Image
          className="movie_image"
          src={imagePath + res.backdrop_path}
          height={1000}
          width={1000}
          priority
          alt="every movie backdrop image"
        />
        <h1 className="movie_des">Movie Description:</h1>
        <p>{res.overview}</p>
        <br />
        <Link href={"/"}>Back To the Home ⬅️</Link>
      </div>
    </div>
  )
}
