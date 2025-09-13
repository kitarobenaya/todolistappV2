import { useState } from 'react'
import './App.css'

export default function App() {
    return (
      <>
        <header>
          <h1 className="text-4xl font-bold text-center font-[Montserrat] mt-4 text-text-primary animate-title underline underline-offset-8">
            Schedule Your Day with Kitaro's To-Do List App
          </h1>
        </header>

        <main className='size-full mt-16'>
          <section className='size-full flex justify-end mb-8'>
            <button type='button' className='addButton bg-accent p-2 mr-8 rounded-xl hover:bg-[#6E867B] hover:cursor-pointer'><span className='add-text flex justify-center size-fit font-[Montserrat] font-bold text-text-primary relative'>Add Schedule</span></button>
          </section>
          <section>

          </section>
        </main>
      </>      
    )
}


