import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../client'
import Card from '../components/Card'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await supabase.from('creators').select('*')
      setCreators(data || [])
    }
    fetchCreators()
  }, [])

  return (
    <main className="container">
      <nav>
        <ul>
          <li><strong>✨ Creatorverse</strong></li>
        </ul>
        <ul>
          <li><Link to="/add" role="button">+ Add Creator</Link></li>
        </ul>
      </nav>

      <div className="creators-grid">
        {creators.length === 0 ? (
          <p>No creators yet. Add one!</p>
        ) : (
          creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))
        )}
      </div>
    </main>
  )
}
