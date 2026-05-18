import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { supabase } from '../client'

export default function AddCreator() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await supabase.from('creators').insert([
      {
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL,
      },
    ])
    navigate('/')
  }

  return (
    <main className="container">
      <div className="form-container">
        <hgroup>
          <h1>Add Creator</h1>
          <p>Add a new content creator to the Creatorverse</p>
        </hgroup>
        <article>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Creator's name" required />
            </label>
            <label>
              URL
              <input name="url" value={form.url} onChange={handleChange} placeholder="https://..." required />
            </label>
            <label>
              Description
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="What do they create?" />
            </label>
            <label>
              Image URL <small>(optional)</small>
              <input name="imageURL" value={form.imageURL} onChange={handleChange} placeholder="https://..." />
            </label>
            <footer>
              <button type="submit">Add Creator</button>
              <Link to="/" role="button" className="secondary outline">Cancel</Link>
            </footer>
          </form>
        </article>
      </div>
    </main>
  )
}
