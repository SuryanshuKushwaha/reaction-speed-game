import React, { useState } from 'react'

export default function Controls(){
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('reaction_leaderboard_stub') || '[]')
    } catch(e){ return [] }
  })

  function refresh(){
    try {
      setLeaderboard(JSON.parse(localStorage.getItem('reaction_leaderboard_stub') || '[]'))
    } catch(e){}
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold">Extras</h2>
        <div className="text-xs text-slate-400">Mock leaderboard (local)</div>
      </div>

      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
        <div className="flex gap-2">
          <button onClick={() => { setShowLeaderboard(s=>!s); refresh() }} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded">Toggle Leaderboard</button>
          <button onClick={() => { localStorage.removeItem('reaction_best_score'); alert('Best score cleared') }} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded">Clear Best</button>
          <button onClick={() => { localStorage.removeItem('reaction_leaderboard_stub'); alert('Leaderboard cleared') }} className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded">Clear Leaderboard</button>
        </div>

        {showLeaderboard && (
          <div className="mt-3">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {leaderboard.length === 0 && <li className="text-slate-400">No scores yet.</li>}
              {leaderboard.map((p, i) => (
                <li key={i} className="flex items-center justify-between">
                  <div><strong>{p.name}</strong> <span className="text-slate-400">— {new Date(p.date).toLocaleString()}</span></div>
                  <div className="font-semibold">{p.score}</div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
