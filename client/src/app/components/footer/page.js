import React from 'react'

const Footer = () => {
  return (
    <>
    <div class="bg-blue-400 w-full  ">
  <div class="container mx-20 px-4 h-full">
    <div class="grid grid-cols-4 ">
      <div class="grid-cols-1">
        <ul>
            <li>Thapathali,Kathmandu,Nepal</li>
            <p>Email:</p><li>info@norvichospital.com</li>
        </ul>
      </div>
      <div class="grid-cols-2 ">
        <ul>
          <h2 class="font-bold mb-2">Overview</h2>
          <li class="hover:text-white cursor-pointer">Hospital Overview</li>
          <li class="hover:text-white cursor-pointer">Medical technology</li>
          <li class="hover:text-white cursor-pointer">Team</li>
          <li class="hover:text-white cursor-pointer">Quality and Safety</li>
          <li class="hover:text-white cursor-pointer">Testimonials</li>
        </ul>
      </div>
      <div class="grid-cols-3">
        <ul>
          <h2 class="font-bold mb-2">Our Services</h2>
          <li class="hover:text-white cursor-pointer">doctors</li>
          <li class="hover:text-white cursor-pointer">Our services</li>
          <li class="hover:text-white cursor-pointer">career</li>
          <li class="hover:text-white cursor-pointer">contact us</li>
        </ul>
        <p>Developed By <br/>
          <a href="/">InBox I.T. Solutions Pvt.Ltd</a>
        </p>
      </div>
      <div class="grid-cols-4">message</div>
    </div>
  </div>
</div>
    </>
  )
}

export default Footer