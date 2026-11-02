export default function Loader({ label = 'Carregando...' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="spinner" />
      <span>{label}</span>
    </div>
  )
}
