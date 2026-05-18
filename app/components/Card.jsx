import { Link } from 'react-router'

export default function Card({ creator }) {
  return (
    <article className="card">
      <img src={creator.imageURL} alt={creator.name} />
      <hgroup>
        <h3>{creator.name}</h3>
        <p>{creator.description}</p>
      </hgroup>
      <footer>
        <Link to={`/creator/${creator.id}`} role="button">View</Link>
        <Link to={`/creator/${creator.id}/edit`} role="button" className="secondary outline">Edit</Link>
        <a href={creator.url} target="_blank" rel="noopener noreferrer" role="button" className="outline">
          Visit
        </a>
      </footer>
    </article>
  )
}
