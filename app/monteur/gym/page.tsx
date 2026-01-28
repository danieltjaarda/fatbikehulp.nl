'use client'

import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type Exercise = {
  id: string
  name: string
  category: string
}

type PR = {
  exerciseId: string
  weight: number
  reps: number
  sets?: number
  date: Date
  userId: string
}

type WorkoutDay = {
  id: string
  name: string
  exercises: Exercise[]
}

const defaultWorkoutDays: WorkoutDay[] = [
  {
    id: 'day1',
    name: 'Chest & Tricep',
    exercises: []
  },
  {
    id: 'day2',
    name: 'Bicep & Rug',
    exercises: []
  },
  {
    id: 'day3',
    name: 'Benen',
    exercises: []
  },
  {
    id: 'day4',
    name: 'Bicep & Schouders',
    exercises: []
  },
  {
    id: 'day5',
    name: 'Tricep & Chest',
    exercises: []
  }
]

export default function GymDashboard() {
  const [currentUser, setCurrentUser] = useState<'marc' | 'daniel'>('marc')
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>(defaultWorkoutDays)
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [prs, setPRs] = useState<PR[]>([])
  const [newExerciseName, setNewExerciseName] = useState('')
  const [showAddExercise, setShowAddExercise] = useState(false)
  const [showAddPR, setShowAddPR] = useState(false)
  const [prForm, setPRForm] = useState({ weight: 0, reps: 0, sets: 0 })
  const [chartPeriod, setChartPeriod] = useState<'week' | 'month' | 'quarter'>('week')
  const [loading, setLoading] = useState(false)

  // Load data from Vercel KV and reset selections when user changes
  useEffect(() => {
    const loadUserData = async () => {
      // Reset all selections when user changes
      setSelectedDay(null)
      setSelectedExercise(null)
      setShowAddExercise(false)
      setShowAddPR(false)
      setPRForm({ weight: 0, reps: 0, sets: 0 })
      setNewExerciseName('')
      setLoading(true)
      
      try {
        // Try to load from Vercel KV first
        const response = await fetch(`/api/gym?userId=${currentUser}`)
        if (response.ok) {
          const { workouts, prs: savedPRs } = await response.json()
          
          if (workouts && workouts.length > 0) {
            setWorkoutDays(workouts)
          } else {
            // Initialize with default workouts for new user
            const userDefaults = defaultWorkoutDays.map(day => ({
              ...day,
              exercises: []
            }))
            setWorkoutDays(userDefaults)
            // Save initial workouts to KV
            await fetch('/api/gym', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: currentUser,
                type: 'workouts',
                data: userDefaults
              })
            })
          }
          
          setPRs(savedPRs || [])
        } else {
          // Fallback to localStorage if KV is not available
          const savedWorkouts = localStorage.getItem(`workouts_${currentUser}`)
          const savedPRs = localStorage.getItem(`prs_${currentUser}`)
          
          if (savedWorkouts) {
            setWorkoutDays(JSON.parse(savedWorkouts))
          } else {
            const userDefaults = defaultWorkoutDays.map(day => ({
              ...day,
              exercises: []
            }))
            setWorkoutDays(userDefaults)
            localStorage.setItem(`workouts_${currentUser}`, JSON.stringify(userDefaults))
          }
          
          setPRs(savedPRs ? JSON.parse(savedPRs) : [])
        }
      } catch (error) {
        console.error('Error loading gym data:', error)
        // Fallback to localStorage
        const savedWorkouts = localStorage.getItem(`workouts_${currentUser}`)
        const savedPRs = localStorage.getItem(`prs_${currentUser}`)
        
        if (savedWorkouts) {
          setWorkoutDays(JSON.parse(savedWorkouts))
        } else {
          const userDefaults = defaultWorkoutDays.map(day => ({
            ...day,
            exercises: []
          }))
          setWorkoutDays(userDefaults)
        }
        
        setPRs(savedPRs ? JSON.parse(savedPRs) : [])
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [currentUser])

  // Save workouts to Vercel KV and localStorage (fallback)
  const saveWorkouts = async (updatedWorkouts: WorkoutDay[]) => {
    setWorkoutDays(updatedWorkouts)
    
    // Save to localStorage as fallback
    localStorage.setItem(`workouts_${currentUser}`, JSON.stringify(updatedWorkouts))
    
    // Try to save to Vercel KV
    try {
      await fetch('/api/gym', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser,
          type: 'workouts',
          data: updatedWorkouts
        })
      })
    } catch (error) {
      console.error('Failed to save workouts to KV:', error)
    }
  }

  // Save PRs to Vercel KV and localStorage (fallback)
  const savePRs = async (updatedPRs: PR[]) => {
    setPRs(updatedPRs)
    
    // Save to localStorage as fallback
    localStorage.setItem(`prs_${currentUser}`, JSON.stringify(updatedPRs))
    
    // Try to save to Vercel KV
    try {
      await fetch('/api/gym', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser,
          type: 'prs',
          data: updatedPRs
        })
      })
    } catch (error) {
      console.error('Failed to save PRs to KV:', error)
    }
  }

  // Add new exercise to a day
  const addExercise = () => {
    if (!selectedDay || !newExerciseName.trim()) return

    const newExercise: Exercise = {
      id: `${currentUser}_${Date.now()}`,
      name: newExerciseName,
      category: selectedDay.name
    }

    const updatedWorkouts = workoutDays.map(day => 
      day.id === selectedDay.id 
        ? { ...day, exercises: [...day.exercises, newExercise] }
        : day
    )

    saveWorkouts(updatedWorkouts)
    setNewExerciseName('')
    setShowAddExercise(false)
    
    // Update selected day
    const updated = updatedWorkouts.find(d => d.id === selectedDay.id)
    if (updated) setSelectedDay(updated)
  }

  // Add PR
  const addPR = () => {
    if (!selectedExercise || prForm.weight <= 0 || prForm.reps <= 0) return

    const newPR: PR = {
      exerciseId: selectedExercise.id,
      weight: prForm.weight,
      reps: prForm.reps,
      sets: prForm.sets || undefined,
      date: new Date(),
      userId: currentUser
    }

    const updatedPRs = [...prs, newPR]
    savePRs(updatedPRs)
    setPRForm({ weight: 0, reps: 0, sets: 0 })
    setShowAddPR(false)
  }

  // Get PRs for selected exercise (only for current user)
  const getExercisePRs = (exerciseId: string) => {
    return prs
      .filter(pr => pr.exerciseId === exerciseId && pr.userId === currentUser)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  // Calculate best PR for an exercise
  const getBestPR = (exerciseId: string) => {
    const exercisePRs = getExercisePRs(exerciseId)
    if (exercisePRs.length === 0) return null
    return exercisePRs.reduce((best, current) => {
      const currentTotal = current.weight * current.reps
      const bestTotal = best.weight * best.reps
      return currentTotal > bestTotal ? current : best
    })
  }

  // Prepare chart data
  const getChartData = () => {
    if (!selectedExercise) return null

    const exercisePRs = getExercisePRs(selectedExercise.id)
      .slice(0, chartPeriod === 'week' ? 7 : chartPeriod === 'month' ? 30 : 90)
      .reverse()

    return {
      labels: exercisePRs.map(pr => new Date(pr.date).toLocaleDateString('nl-NL')),
      datasets: [
        {
          label: 'Gewicht (kg)',
          data: exercisePRs.map(pr => pr.weight),
          borderColor: 'rgb(17, 24, 39)',
          backgroundColor: 'rgba(17, 24, 39, 0.05)',
          borderWidth: 2,
          tension: 0.4,
          yAxisID: 'y',
        },
        {
          label: 'Volume (kg × reps)',
          data: exercisePRs.map(pr => pr.weight * pr.reps),
          borderColor: 'rgb(156, 163, 175)',
          backgroundColor: 'rgba(156, 163, 175, 0.05)',
          borderWidth: 2,
          tension: 0.4,
          yAxisID: 'y1',
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Gewicht (kg)',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Volume (kg × reps)',
          font: {
            size: 11,
          },
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-gray-900">Gym Tracker</h1>
              <span className="text-sm text-gray-500">
                {currentUser === 'marc' ? 'Marc' : 'Daniel'}'s progressie
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 mr-2">Gebruiker:</span>
              <button
                onClick={() => {
                  if (currentUser !== 'marc') {
                    if (selectedExercise || selectedDay) {
                      if (confirm('Wil je switchen naar Marc? Huidige selecties worden gereset.')) {
                        setCurrentUser('marc')
                      }
                    } else {
                      setCurrentUser('marc')
                    }
                  }
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  currentUser === 'marc' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Marc
              </button>
              <button
                onClick={() => {
                  if (currentUser !== 'daniel') {
                    if (selectedExercise || selectedDay) {
                      if (confirm('Wil je switchen naar Daniel? Huidige selecties worden gereset.')) {
                        setCurrentUser('daniel')
                      }
                    } else {
                      setCurrentUser('daniel')
                    }
                  }
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  currentUser === 'daniel' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Daniel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-500">Data wordt geladen...</p>
            </div>
          </div>
        ) : (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout Days */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <h2 className="text-sm font-medium text-gray-900">Workout Schema</h2>
              </div>
              <div className="p-3">
                <div className="space-y-1">
                  {workoutDays.map((day) => (
                    <button
                      key={day.id}
                      onClick={() => setSelectedDay(day)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                        selectedDay?.id === day.id
                          ? 'bg-gray-100 text-gray-900 font-medium'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{day.name}</span>
                        <span className="text-xs text-gray-500">
                          {day.exercises.length}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exercises */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-sm font-medium text-gray-900">Oefeningen</h2>
                {selectedDay && (
                  <button
                    onClick={() => setShowAddExercise(true)}
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                  >
                    + Toevoegen
                  </button>
                )}
              </div>

              <div className="p-3">
                {selectedDay ? (
                  <div className="space-y-1">
                    {selectedDay.exercises.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-8">
                        Nog geen oefeningen toegevoegd
                      </p>
                    ) : (
                      selectedDay.exercises.map((exercise) => {
                        const bestPR = getBestPR(exercise.id)
                        return (
                          <button
                            key={exercise.id}
                            onClick={() => setSelectedExercise(exercise)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                              selectedExercise?.id === exercise.id
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className={selectedExercise?.id === exercise.id ? 'font-medium' : ''}>
                                {exercise.name}
                              </span>
                              {bestPR && (
                                <span className="text-xs text-gray-500">
                                  {bestPR.weight}kg
                                </span>
                              )}
                            </div>
                            {bestPR && (
                              <div className="text-xs text-gray-500 mt-0.5">
                                {bestPR.reps} reps
                              </div>
                            )}
                          </button>
                        )
                      })
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">
                    Selecteer een workout dag
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* PR History & Add PR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-sm font-medium text-gray-900">Historie</h2>
                {selectedExercise && (
                  <button
                    onClick={() => setShowAddPR(true)}
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                  >
                    + PR toevoegen
                  </button>
                )}
              </div>

              <div className="p-3">
                {selectedExercise ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {getExercisePRs(selectedExercise.id).length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-8">
                        Nog geen PR's toegevoegd
                      </p>
                    ) : (
                      getExercisePRs(selectedExercise.id).map((pr, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 border border-gray-200 rounded-md hover:border-gray-300 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-sm font-medium text-gray-900">
                                {pr.weight}kg
                              </span>
                              <span className="text-sm text-gray-600 ml-2">
                                × {pr.reps} reps
                                {pr.sets && ` × ${pr.sets} sets`}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(pr.date).toLocaleDateString('nl-NL')}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">
                    Selecteer een oefening
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={async () => {
              if (confirm(`Weet je zeker dat je alle data van ${currentUser} wilt verwijderen? Dit kan niet ongedaan worden gemaakt.`)) {
                setLoading(true)
                try {
                  // Delete from Vercel KV
                  await fetch(`/api/gym?userId=${currentUser}`, {
                    method: 'DELETE'
                  })
                  
                  // Clear localStorage
                  localStorage.removeItem(`workouts_${currentUser}`)
                  localStorage.removeItem(`prs_${currentUser}`)
                  
                  // Reset state
                  const userDefaults = defaultWorkoutDays.map(day => ({
                    ...day,
                    exercises: []
                  }))
                  setWorkoutDays(userDefaults)
                  setPRs([])
                  setSelectedDay(null)
                  setSelectedExercise(null)
                  
                  // Save defaults to KV
                  await fetch('/api/gym', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      userId: currentUser,
                      type: 'workouts',
                      data: userDefaults
                    })
                  })
                  
                  alert(`Alle data van ${currentUser} is verwijderd.`)
                } catch (error) {
                  console.error('Error resetting data:', error)
                  alert('Er ging iets mis bij het verwijderen van data.')
                } finally {
                  setLoading(false)
                }
              }
            }}
            className="text-xs text-red-600 hover:text-red-800 font-medium"
          >
            Reset {currentUser}'s data
          </button>
        </div>

        {/* Progress Chart */}
        {selectedExercise && getExercisePRs(selectedExercise.id).length > 0 && (
          <div className="mt-6 bg-white rounded-lg border border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-medium text-gray-900">Progressie</h2>
                <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
                  <button
                    onClick={() => setChartPeriod('week')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      chartPeriod === 'week'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setChartPeriod('month')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      chartPeriod === 'month'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Maand
                  </button>
                  <button
                    onClick={() => setChartPeriod('quarter')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      chartPeriod === 'quarter'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Kwartaal
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              {getChartData() && (
                <Line data={getChartData()!} options={chartOptions} />
              )}
            </div>
          </div>
        )}

        {/* Add Exercise Modal */}
        {showAddExercise && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Oefening toevoegen</h3>
              </div>
              <div className="p-6">
                <input
                  type="text"
                  placeholder="Naam van de oefening"
                  value={newExerciseName}
                  onChange={(e) => setNewExerciseName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  autoFocus
                />
              </div>
              <div className="px-6 py-3 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
                <button
                  onClick={() => {
                    setShowAddExercise(false)
                    setNewExerciseName('')
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Annuleren
                </button>
                <button
                  onClick={addExercise}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800"
                >
                  Toevoegen
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add PR Modal */}
        {showAddPR && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">PR toevoegen</h3>
                {selectedExercise && (
                  <p className="text-sm text-gray-500 mt-1">{selectedExercise.name}</p>
                )}
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gewicht (kg)</label>
                  <input
                    type="number"
                    value={prForm.weight}
                    onChange={(e) => setPRForm({ ...prForm, weight: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    step="0.5"
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reps</label>
                    <input
                      type="number"
                      value={prForm.reps}
                      onChange={(e) => setPRForm({ ...prForm, reps: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sets <span className="text-gray-400 font-normal">(optioneel)</span></label>
                    <input
                      type="number"
                      value={prForm.sets}
                      onChange={(e) => setPRForm({ ...prForm, sets: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 flex justify-end gap-3 rounded-b-lg">
                <button
                  onClick={() => {
                    setShowAddPR(false)
                    setPRForm({ weight: 0, reps: 0, sets: 0 })
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Annuleren
                </button>
                <button
                  onClick={addPR}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800"
                >
                  Opslaan
                </button>
              </div>
            </div>
          </div>
        )}
        </>
        )}
      </div>
    </div>
  )
}
