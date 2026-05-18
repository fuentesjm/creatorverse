import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()
      if (data) setForm(data)
    }
    fetchCreator()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDelete = async () => {
    await supabase.from('creators').delete().eq('id', id)
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await supabase
      .from('creators')
      .update({
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL,
      })
      .eq('id', id)
    navigate(`/creator/${id}`)
  }

  return (
    <main className="container">
      <div className="form-container">
        <hgroup>
          <h1>Edit Creator</h1>
          <p>Update this creator's information</p>
        </hgroup>
        <article>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              URL
              <input name="url" value={form.url} onChange={handleChange} required />
            </label>
            <label>
              Description
              <textarea name="description" value={form.description} onChange={handleChange} />
            </label>
            <label>
              Image URL <small>(optional)</small>
              <input name="imageURL" value={form.imageURL} onChange={handleChange} />
            </label>
            <footer>
              <button type="submit">Update Creator</button>
              <Link to={`/creator/${id}`} role="button" className="secondary outline">Cancel</Link>
              <button type="button" className="contrast outline" onClick={handleDelete}>Delete</button>
            </footer>
          </form>
        </article>
      </div>
    </main>
  )
}
