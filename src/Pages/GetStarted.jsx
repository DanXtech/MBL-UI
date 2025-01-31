import React from 'react'
import { Link } from 'react-router-dom'

const GetStarted = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 bg-purple-100 rounded-lg"
            data-aos="fade-left"
            data-aos-delay="300"
        >
            <h1 className="text-3xl font-bold text-purple-800">Welcome to the Card Generator</h1>
            <p className="text-lg text-purple-600 mt-2">Choose an option to get started!</p>
            <div className="mt-6 flex gap-4">
                <div className='w-[200px] border'>
                    <Link to="/score-card">
                        <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600">
                            Get Score Card
                        </button>
                    </Link>
                </div>

                <div>
                    <Link to="/commentary-card">
                        <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600">
                            Get Commentary Card
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GetStarted