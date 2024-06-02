'use client'
import Image from 'next/image'
import React from 'react'

const Message = () => {
  return (
    <div className='bg-gray-400 w-full min-h-screen p-4 grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4'>
      
        <div className='flex flex-col justify-center bg-transparent p-4 rounded-lg shadow-lg'>
          <h1 className='text-3xl font-bold'>MESSAGE FROM THE DIRECTOR</h1>
          <p className='text-left mt-4'>
            On behalf of Kantipur Hospital Pvt. Ltd, I want to thank all the members associated with this organization, friends, and family who have always been along with the growth and success.
            Kantipur Hospital Pvt. Ltd. established 2054 B.S. with the motto of providing health services to all the people of the country, since then it has overcome as one of the most distinguished Hospitals in Nepal. Here we have very talented and caring medical staff who are very generous towards their service giving their best effort to deliver high quality of medical services to meet the needs of patients.
            Talking more about the hospital and its medical services & facilities, the Hospital is well equipped with modern medical equipment and highly qualified doctors, consultants, and management staff.
            Stepping towards our services we have already served with our standard which had led us the recognition from different National & international forums. Our hospital has always provided a standard health care at an affordable cost. So our belief is "Health is Wealth". We value our Patients.
            <br />
            <span className='font-medium mt-2 block'>Thank You</span>
            <br />
            <span className='font-semibold block'>
            Dr.Kiran Manandhar
            <br />
            MEDICAL DIRECTOR
            </span>
          </p>
        </div>
        <div className='flex flex-col justify-start items-center bg-slate-200 p-4 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold text-blue-600 mt-5'>Health Tips</h2>
          <h3 className='text-xl font-semibold text-red-600 mt-2'>Covid-19</h3>
          <p className='text-left mt-4'>
            Whether you are in quarantine or self-isolation due to COVID-19, you will inevitably be spending more time at home. Following general healthy living advice such as eating a balanced diet, staying hydrated, being physically active, getting enough sleep, and managing stress are the best recommendations for staying healthy during quarantine or self-isolation. If you are interested in food-related issues with COVID-19, read Food and coronavirus (COVID-19): what you need to know
          </p>
          <ul className='list-disc text-left mt-4 ml-4'>
            <li>Eat a balanced and varied diet</li>
            <li>Establish a routine and practice mindful eating</li>
            <li>Keep hydrated</li>
            <li>Practice safe food hygiene</li>
            <li>Stay active at home</li>
            <li>Get enough quality sleep</li>
            <li>Get information from trustworthy sources</li>
          </ul>
        </div>
    </div>
  )
}

export default Message
