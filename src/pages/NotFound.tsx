import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="card p-10 text-center">
      <h2 className="text-lg font-bold text-ink">Page not found</h2>
      <p className="mt-2 text-sm text-ink-muted">
        That screen doesn't exist in this prototype.
      </p>
      <Link to="/" className="btn-primary mt-4">
        Back to My Actions
      </Link>
    </div>
  )
}
