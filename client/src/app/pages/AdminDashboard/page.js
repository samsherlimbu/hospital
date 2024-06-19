import React from 'react'
import { allDoctors } from '../doctor/page'

const siderbar=[
    'Department',"Doctor","patient","Patient Appointment","Patient Case Studies","Prescription"
]

const AdminDashboard = () => {
  return (
    <div className='grid grid-cols-3 p-6'>
   {siderbar.map((sider,index)=>(
     <div className="flex h-[80px] w-[250px] space-x-4 rounded-xl bg-white px-3 shadow-lg justify-between items-center mb-9">
     <div>
       <p className="text-gray-500">{sider}</p>
       {/* <p className="text-2xl font-bold">{sider === 'Doctor' ? allDoctors.length : 0}</p> */}
     </div>
     <div>icon</div> 
   </div>
   ))}
</div>
  )
}

export default AdminDashboard;
