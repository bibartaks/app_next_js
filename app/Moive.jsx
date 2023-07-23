import Link from "next/link"
import Image from "next/image"

const Moive = ({ title, key, id, poster_path, rerelease_date }) => {
  const imagePath = "https://image.tmdb.org/t/p/original"
  return (
    <div>
      <h2>{rerelease_date}</h2>
      <Link href={`/${id}`}>
        <Image
          src={imagePath + poster_path}
          width={800}
          height={800}
          alt="moive image"
        />
      </Link>
      <h1 className="movie_title">{title}</h1>
    </div>
  )
}

export default Moive
