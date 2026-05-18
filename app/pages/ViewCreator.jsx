import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase.from('creators').select('*')
      const match = data.filter((creator) => creator.id == id)
      setCreator(match[0])
    }
    fetchCreator()
  }, [id])

  const handleDelete = async () => {
    await supabase.from('creators').delete().eq('id', id)
    navigate('/')
  }

  if (!creator) return <main className="container"><p aria-busy="true">Loading...</p></main>

  return (
    <main className="container">
      <div className="creator-detail">
        <img src={creator.imageURL} alt={creator.name} />
        <hgroup>
          <h1>{creator.name}</h1>
          <p>{creator.description}</p>
        </hgroup>
        <a href={creator.url} target="_blank" rel="noopener noreferrer" role="button">
          Visit Channel
        </a>
        <div className="actions">
          <Link to={`/creator/${id}/edit`} role="button" className="secondary">Edit</Link>
          <button className="contrast outline" onClick={handleDelete}>Delete</button>
        </div>
        <Link to="/" className="secondary">← Back to all creators</Link>
      </div>
    </main>
  )
}
