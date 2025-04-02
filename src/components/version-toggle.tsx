'use client'

import React, { useState, useEffect } from 'react'
import { RotateCcw, History } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VersionToggle() {
  const [mounted, setMounted] = useState(false)
  const [isOldVersion, setIsOldVersion] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationText, setNotificationText] = useState('')
  
  // Initialize state from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedVersion = localStorage.getItem('blog-version')
    setIsOldVersion(savedVersion === 'old')
    
    // Apply version-specific styles on initialization
    if (savedVersion === 'old') {
      applyOldVersionStyles(false) // Don't show notification on initial load
    }
  }, [])
  
  // Show notification function
  const displayNotification = (message) => {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.version-change-notification')
    if (existingNotification) {
      existingNotification.remove()
    }
    
    // Create and show notification
    setNotificationText(message)
    setShowNotification(true)
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }
  
  // Apply old version styles
  const applyOldVersionStyles = (notify = true) => {
    console.log('Applying old version styles')
    
    // Switch to old version styles from commit ada38c6fb561cfdfe45f8cb0283058d7c9cd5f78
    document.documentElement.classList.add('old-version')
    
    // Apply direct style changes for immediate visual feedback
    document.documentElement.style.setProperty('--base-100', '#f8fafc')
    document.documentElement.style.setProperty('--base-content', '#1e293b')
    document.documentElement.style.setProperty('--primary', '#0f766e')
    
    // Change emerald colors to blue
    const emeraldElements = document.querySelectorAll('.bg-emerald-50, .bg-emerald-100, .border-emerald-100, .text-emerald-600, .text-emerald-700, .bg-emerald-500')
    emeraldElements.forEach(el => {
      if (el.classList.contains('bg-emerald-50')) {
        el.classList.remove('bg-emerald-50')
        el.classList.add('bg-blue-50')
      }
      if (el.classList.contains('bg-emerald-100')) {
        el.classList.remove('bg-emerald-100')
        el.classList.add('bg-blue-100')
      }
      if (el.classList.contains('border-emerald-100')) {
        el.classList.remove('border-emerald-100')
        el.classList.add('border-blue-100')
      }
      if (el.classList.contains('text-emerald-600')) {
        el.classList.remove('text-emerald-600')
        el.classList.add('text-blue-600')
      }
      if (el.classList.contains('text-emerald-700')) {
        el.classList.remove('text-emerald-700')
        el.classList.add('text-blue-700')
      }
      if (el.classList.contains('bg-emerald-500')) {
        el.classList.remove('bg-emerald-500')
        el.classList.add('bg-blue-500')
      }
    })
    
    // Show notification if needed
    if (notify) {
      displayNotification('Switched to old blog version (ada38c6)')
    }
  }
  
  // Apply current version styles
  const applyCurrentVersionStyles = (notify = true) => {
    console.log('Applying current version styles')
    
    document.documentElement.classList.remove('old-version')
    
    // Reset to current theme styles
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      document.documentElement.style.setProperty('--base-100', '#0f172a')
      document.documentElement.style.setProperty('--base-content', '#f8fafc')
      document.documentElement.style.setProperty('--primary', '#3b82f6')
    } else {
      document.documentElement.style.setProperty('--base-100', '#ffffff')
      document.documentElement.style.setProperty('--base-content', '#0f172a')
      document.documentElement.style.setProperty('--primary', '#059669')
    }
    
    // Revert blue colors back to emerald
    const blueElements = document.querySelectorAll('.bg-blue-50, .bg-blue-100, .border-blue-100, .text-blue-600, .text-blue-700, .bg-blue-500')
    blueElements.forEach(el => {
      if (el.classList.contains('bg-blue-50')) {
        el.classList.remove('bg-blue-50')
        el.classList.add('bg-emerald-50')
      }
      if (el.classList.contains('bg-blue-100')) {
        el.classList.remove('bg-blue-100')
        el.classList.add('bg-emerald-100')
      }
      if (el.classList.contains('border-blue-100')) {
        el.classList.remove('border-blue-100')
        el.classList.add('border-emerald-100')
      }
      if (el.classList.contains('text-blue-600')) {
        el.classList.remove('text-blue-600')
        el.classList.add('text-emerald-600')
      }
      if (el.classList.contains('text-blue-700')) {
        el.classList.remove('text-blue-700')
        el.classList.add('text-emerald-700')
      }
      if (el.classList.contains('bg-blue-500')) {
        el.classList.remove('bg-blue-500')
        el.classList.add('bg-emerald-500')
      }
    })
    
    // Show notification if needed
    if (notify) {
      displayNotification('Switched to current blog version')
    }
  }
  
  // Handle version toggle
  const toggleVersion = () => {
    const newVersion = !isOldVersion
    console.log('Toggling to', newVersion ? 'old' : 'current', 'version')
    
    setIsOldVersion(newVersion)
    localStorage.setItem('blog-version', newVersion ? 'old' : 'current')
    
    // Apply version-specific styles
    if (newVersion) {
      applyOldVersionStyles()
    } else {
      applyCurrentVersionStyles()
    }
  }
  
  if (!mounted) return null
  
  return (
    <>
      <button
        aria-label={isOldVersion ? "Switch to current version" : "Switch to old version"}
        className="relative group text-base-content/70 hover:text-base-content transition-colors"
        onClick={toggleVersion}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOldVersion ? 'old' : 'current'}
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {isOldVersion ? (
              <RotateCcw className="h-4 w-4" />
            ) : (
              <History className="h-4 w-4" />
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Tooltip */}
        <span className="hidden group-hover:block absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs font-mono bg-base-300 text-base-content px-2 py-1 rounded whitespace-nowrap z-50">
          {isOldVersion ? "Switch to current version" : "Switch to old version"}
        </span>
      </button>
      
      {/* Version change notification */}
      {showNotification && (
        <div className="version-change-notification">
          <span>{notificationText}</span>
        </div>
      )}
    </>
  )
} 