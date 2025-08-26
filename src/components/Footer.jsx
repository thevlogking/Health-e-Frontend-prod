import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="md:mx-10">
      {/* Main Footer Section */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* About Section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Health-e Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Health-e is your trusted e-healthcare platform, connecting patients with expert doctors
            while providing secure access to reports, appointments, and medical support — anytime, anywhere.
          </p>
        </div>

        {/* Company Links */}
        

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">GET SUPPORT</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>033-23456789</li>
            <li>health.eapp.official@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-600">
          © 2025 Health-e.com — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
