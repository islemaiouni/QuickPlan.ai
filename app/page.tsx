//'use client'

//import Image from 'next/image'
//import styles from '.globals.css'
//import { motion } from "framer-motion";


/*export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
        <motion.h1
          className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.2 }}
        >
          Restoring old photos{" "}
          <span className="relative whitespace-nowrap text-[#3290EE]">
            <motion.span
              className="relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
            >
              using Restore-vison  AIc
            </motion.span>
 
          </span>{" "}
          free for everyone.
        </motion.h1>
      </main>
  )
}*/

'use client'
import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './globals.css'

export default function Home() {
  const [request, setRequest] = useState<{days?: string, city?: string}>({})
  let [itinerary, setItinerary] = useState<string>('')

  useEffect(() => {
    checkRedirect()
  }, [])

  function checkRedirect() {
    if (window.location.hostname === 'gpt-travel-advisor.vercel.app') {
      window.location.replace('https://www.roamaround.io/')
    }
  }

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  async function hitAPI() {
    try {
      if (!request.city || !request.days) return
      setMessage('Building itinerary...')
      setLoading(true)
      setItinerary('')

      setTimeout(() => {
        if (!loading) return
        setMessage('Getting closer ...')
      }, 7000)

      setTimeout(() => {
        if (!loading) return
        setMessage('Almost there ...')
      }, 15000)

      const response = await fetch('/api/get-itinerary', {
        method: 'POST',
        body: JSON.stringify({
          days: request.days,
          city: request.city
        })
      })
      const json = await response.json()
      
      const response2 = await fetch('/api/get-points-of-interest', {
        method: 'POST',
        body: JSON.stringify({
          pointsOfInterestPrompt: json.pointsOfInterestPrompt,
        })
      })
      const json2 = await response2.json()

      let pointsOfInterest = JSON.parse(json2.pointsOfInterest)
      let itinerary = json.itinerary

      pointsOfInterest.map(point => {
        // itinerary = itinerary.replace(point, `<a target="_blank" rel="no-opener" href="https://www.google.com/search?q=${encodeURIComponent(point + ' ' + request.city)}">${point}</a>`)
        itinerary = itinerary.replace(point, `[${point}](https://www.google.com/search?q=${encodeURIComponent(point + ' ' + request.city)})`)
      })

      setItinerary(itinerary)
      setLoading(false)
    } catch (err) {
      console.log('error: ', err)
      setMessage('')
    }
  }
  
  let days = itinerary.split('Day')

  if (days.length > 1) {
    days.shift()
  } else {
    days[0] = "1" + days[0]
  }

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-28 mt-20">
       <motion.h1
          className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-slate-900 sm:text-7xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.2 }}
        >
          Restoring Trael advisor{" "}
          <span className="relative whitespace-nowrap text-[#3290EE]">
            <motion.span
              className="relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.2 }}
            >
              using QuickPlan  AI
            </motion.span>
 
          </span>{" "}
          free for everyone.
        </motion.h1>
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg p-10">
            <input className="block w-full border border-gray-400 p-4 rounded-lg my-4" placeholder="City" onChange={e => setRequest(request => ({
              ...request, city: e.target.value
            }))} />
            <input className="block w-full border border-gray-400 p-4 rounded-lg my-4" placeholder="Days" onChange={e => setRequest(request => ({
              ...request, days: e.target.value
            }))} />
            <button className="block w-full p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700" onClick={hitAPI}>Genearate Itinerary</button>
          </div>
          <div className="results-container">
            {
              loading && (
                <p>{message}</p>
              )
            }
            {
              itinerary && days.map((day, index) => (
                <div
                  className="mb-10"
                  key={index}
                >
                  <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: props => {
                        return <a target="_blank" rel="no-opener" href={props.href}>{props.children}</a>
                    }
                }}
                  >
                    {`Day ${day}`}
                    </ReactMarkdown>
                </div>
              ))
            }
          </div>
        </div>
      </main>
  )
}
