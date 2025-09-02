export default function Loading() {
  return (
    <div className="min-h-screen bg-background-off flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Loading Careers</h2>
        <p className="text-text-secondary">Discovering amazing opportunities...</p>
      </div>
    </div>
  )
}
