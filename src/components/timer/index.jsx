import PropTypes from 'prop-types'
import { differenceInSeconds } from 'date-fns'
import { useState, useEffect } from 'react'

import { useCycle } from '../../contexts/cycle'

import './timer.css'

export function Timer() {

    const { activeCycle, markCurrentCycleAsFinished } = useCycle()

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    // Separando os dados

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    function playSoundCoundown() {
        const audio = new Audio('/audios/audio-countdown.mp3')
        audio.play()
    }

    useEffect(() => {
        let intervalId;

        if(activeCycle) {
            //WEB API - setInterval
            intervalId = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))

                if(secondsDifference > totalSeconds) {
                    markCurrentCycleAsFinished()
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(intervalId)
                } 
                else {
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(intervalId)
        } 

    }, [activeCycle, totalSeconds, markCurrentCycleAsFinished])

    useEffect(() => {
        if(minutesAmount == 0 && secondsAmount == 3){
            playSoundCoundown()
        }
    }, [secondsAmount, minutesAmount])

    useEffect(() => {
        if(activeCycle) {
            document.title = `${minutes}:${seconds} - ${activeCycle.task}`
        }
    }, [activeCycle, minutes, seconds])
    return (
        <div className='container--timer'>
            {/* Minutos */}
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            {/* Separador */}
            <div className='separator--timer'>:</div>
            {/* Segundos */}
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </div>
    )
}

Timer.propTypes = {
    activeCycle: PropTypes.object,
}