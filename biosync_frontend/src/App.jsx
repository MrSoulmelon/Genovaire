import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Innovation from './components/Innovation'
import Applications from './components/Applications'
import ApplicationsPage from './components/ApplicationsPage'
import Technology from './components/Technology'
import Simulation from './components/Simulation'
import Statistics from './components/Statistics'
import Starfield from './components/Starfield'

function App() {
    const [currentPage, setCurrentPage] = useState('home')

    const renderPage = () => {
        switch (currentPage) {
            case 'technology':
                return <Technology / >
                    case 'applications':
                return <ApplicationsPage / >
                    case 'simulation':
                return <Simulation / >
                    case 'statistics':
                return <Statistics / >
                    default:
                    return ( <
                        >
                        <
                        Hero onNavigate = { setCurrentPage }
                        /> <
                        Problem / >
                        <
                        Innovation / >
                        <
                        Applications / >
                        <
                        />
                    )
        }
    }

    return ( <
        div className = "relative w-full min-h-screen overflow-x-hidden" >
        <
        Starfield / >
        <
        div className = "relative z-10 flex flex-col min-h-screen" >
        <
        Header currentPage = { currentPage }
        setCurrentPage = { setCurrentPage }
        /> <
        main className = "flex-grow" > { renderPage() } <
        /main> <
        /div> <
        /div>
    )
}

export default App