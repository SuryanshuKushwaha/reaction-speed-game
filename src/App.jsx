import React from 'react'
import Game from './components/Game'
import Controls from './components/Controls'

export default function App(){
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 shadow-2xl border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Reaction Speed</h1>
          <div className="text-sm text-slate-400">Save your best score locally</div>
        </div>
        <Game />
        <Controls />
      </div>
    </div>
  )
}
