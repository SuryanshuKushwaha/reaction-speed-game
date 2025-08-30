import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'reaction_best_score'
const LEADERBOARD_KEY = 'reaction_leaderboard_stub'

function randInt(min, max){ return Math.floor(Math.random()*(max-min+1))+min }

export default function Game(){
  const [running, setRunning] = useState(false)
  const [paused, setPaused] = useState(false)
  const [round, setRound] = useState(0)
  const [timeLimit, setTimeLimit] = useState(1500)
  const [targetPos, setTargetPos] = useState({x:50,y:50})
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => Number(localStorage.getItem(STORAGE_KEY) || 0))
  const [message, setMessage] = useState('Press START to begin')
  const timerRef = useRef(null)
  const spawnRef = useRef(null)

  useEffect(()=> {
    if(!localStorage.getItem(LEADERBOARD_KEY)){
      const stub = [
        {name: "You", score: best, date: new Date().toISOString()},
        {name: "Alex", score: Math.max(5,best-2), date: new Date().toISOString()}
      ]
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(stub))
    }
  }, [])

  useEffect(()=>{
    if(running && !paused){
      spawnNext()
    }
    return () => clearTimeout(spawnRef.current)
  }, [running, paused, round, timeLimit])

  function spawnNext(){
    setTargetPos({ x: randInt(10, 90), y: randInt(20, 80) })
    setMessage('Click the circle!')
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setMessage('Too slow — Game Over')
      setRunning(false)
      saveBest()
    }, timeLimit)
  }

  function handleStart(){
    setScore(0)
    setRound(1)
    setTimeLimit(1500)
    setRunning(true)
    setPaused(false)
    setMessage('Get ready...')
    setTimeout(()=> spawnNext(), 350)
  }

  function handleClickTarget(e){
    if(!running || paused) return
    clearTimeout(timerRef.current)
    setScore(s => s+1)
    setRound(r => r+1)
    setMessage('Nice!')
    setTimeLimit(prev => Math.max(350, Math.round(prev * 0.9)))
  }

  function handlePauseToggle(){
    if(!running) return
    setPaused(p => !p)
    setMessage(p => p ? 'Resumed' : 'Paused')
    if(paused){
      spawnNext()
    } else {
      clearTimeout(timerRef.current)
    }
  }

  function saveBest(){
    setBest(prev => {
      const newBest = Math.max(prev, score)
      localStorage.setItem(STORAGE_KEY, String(newBest))
      try {
        const lb = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || '[]')
        lb.push({name: "Player", score: newBest, date: new Date().toISOString()})
        lb.sort((a,b)=> b.score - a.score)
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb.slice(0,10)))
      } catch(e){}
      return newBest
    })
  }

  function handleRestart(){
    clearTimeout(timerRef.current)
    setRunning(false)
    setPaused(false)
    setRound(0)
    setScore(0)
    setTimeLimit(1500)
    setMessage('Press START to begin')
  }

  return (
    <div>
      <div className="bg-slate-800 rounded-xl p-4 mb-4 border border-slate-700">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <div className="text-xs text-slate-400">Score</div>
            <div className="text-2xl font-bold">{score}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Best</div>
            <div className="text-2xl font-bold">{best}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Round</div>
            <div className="text-2xl font-bold">{round}</div>
          </div>
          <div className="text-sm text-slate-400">Limit: {timeLimit} ms</div>
        </div>

        <div className="relative bg-slate-900/40 h-64 rounded-lg overflow-hidden border border-slate-700">
          <AnimatePresence>
            {running && !paused && (
              <motion.button
                key={round}
                onClick={handleClickTarget}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 700, damping: 20 }}
                style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg ring-4 ring-slate-700/30 hover:scale-105 transform transition">
                  <div className="w-12 h-12 rounded-full bg-emerald-400/90 flex items-center justify-center text-slate-900 font-semibold">GO</div>
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          {!running && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-lg font-semibold">{message}</div>
                <div className="text-sm text-slate-400 mt-2">Click START to play. Pause while in-game to take a break.</div>
              </div>
            </div>
          )}
          {paused && running && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
              <div className="text-center">
                <div className="text-xl font-semibold">Paused</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-md font-semibold shadow-inner"
        >
          START
        </button>

        <button
          onClick={handlePauseToggle}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md font-semibold"
        >
          {paused ? 'RESUME' : 'PAUSE'}
        </button>

        <button
          onClick={() => { saveBest(); setMessage('Saved best score') }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold"
        >
          SAVE BEST
        </button>

        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold ml-auto"
        >
          RESTART
        </button>
      </div>
    </div>
  )
}
