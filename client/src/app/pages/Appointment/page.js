import React from 'react'

const Appointment = () => {
  const options = [
    'None','gastrology','pathology','gyanology'
  ]
  const options1 =[
    'Nome','samsher','kaylin','aashish'
  ]
  return (
    <div className='container mx-auto px-4 py-8'>
      <form>
        <div className='mb-8'>
          <h1>Doctors Information</h1>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 px-2 mb-2'>
              <label id="department" className='block text-sm font-medium text-gray-700 mb-2'>Department</label>
              <select  id="department" className='block w-full border-gray-300 rounded-sm shadow-lg'>
                {
                  options.map((items,index)=>(
                    <option key={index} value={items}>{items}</option>
                  ))
                }
              </select>
            </div>
            <div className='w-full md:w-1/2 px-2 mb-2'>
              <label  className='block text-sm font-medium text-gray-700 mb-2'>Doctors</label>
              <select  className='block w-full border-gray-300 rounded-sm shadow-lg'>
                {
                  options1.map((items,index)=>(
                    <option key={index} value={items}>{items}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Appointment