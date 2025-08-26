import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { jsPDF } from 'jspdf'
import axios from 'axios'

const Report = () => {
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleDownloadReport = async () => {
    try {
      // Validation
      if (!/^[0-9]+$/.test(phone)) {
        setError("❌ Enter a valid Phone number.")
        return
      }
      if (!email.endsWith("@gmail.com")) {
        setError("❌ Email must end with @gmail.com.")
        return
      }
      if (!date) {
        setError("❌ Please select Appointment Date.")
        return
      }

      setError("")
      setLoading(true)

      // ✅ Fetch from backend
      const res = await axios.get("https://health-e-backend-prod.onrender.com/api/reports/getReport", {
        params: { phone, date }
      })

      if (!res.data.success) {
        setError(res.data.message || "❌ Report not found.")
        setLoading(false)
        return
      }

      const report = res.data.data

      // ✅ Create professional styled PDF
      const doc = new jsPDF()

      // --- Watermark Logo ---
      const gState = doc.GState({ opacity: 0.1 }) // 10% opacity
      doc.setGState(gState)
      doc.addImage("/logo.png", "PNG", 40, 60, 130, 130) // center watermark
      doc.setGState(new doc.GState({ opacity: 1 })) // reset opacity for text

      // --- Header ---
      doc.setFont("helvetica", "bold")
      doc.setFontSize(20)
      doc.text("Health-e Medical Report", 105, 20, { align: "center" })

      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")
      doc.text("Contact us on ", 105, 28, { align: "center" })
      doc.text("Tel: 033-23456789 | Email: health.eapp.official@gmail.com", 105, 34, { align: "center" })

      // Divider
      doc.setLineWidth(0.5)
      doc.line(20, 38, 190, 38)

      // --- Patient Info ---
      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("Patient Information", 20, 50)

      doc.setFont("helvetica", "normal")
      doc.text(`Name        : ${report.patientName}`, 20, 60)
      doc.text(`Phone       : ${report.phone}`, 20, 70)
      doc.text(`Date        : ${report.date}`, 20, 80)
      doc.text(`Email       : ${email}`, 20, 90)

      // Divider
      doc.line(20, 95, 190, 95)

      // --- Problems / Diagnosis ---
      doc.setFont("helvetica", "bold")
      doc.text("Diagnosis / Problems", 20, 110)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)
      doc.text(doc.splitTextToSize(report.problems, 170), 20, 120)

      // Divider
      doc.line(20, 140, 190, 140)

      // --- Medicines ---
      doc.setFont("helvetica", "bold")
      doc.setFontSize(12)
      doc.text("Prescribed Medicines", 20, 155)

      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)
      doc.text(doc.splitTextToSize(report.medicine, 170), 20, 165)

      // --- Footer ---
      doc.setFont("helvetica", "italic")
      doc.setFontSize(10)
      doc.text("This is a computer-generated prescription and does not require a signature.", 105, 280, { align: "center" })

      // Save file
      doc.save(`Health-e_Report_${report.phone}_${report.date}.pdf`)
      setLoading(false)
    } catch (err) {
      setError("❌ Report not found or server error.")
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>DOWNLOAD <span className='text-gray-700 font-semibold'>REPORT</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        
        {/* Image */}
        <img 
          className='w-72 md:w-80 object-contain mx-auto md:mx-0' 
          src={assets.contact_image} 
          alt="Contact Illustration" 
        />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>REPORT CENTER</p>
          <p className='text-gray-500'>
            Enter your Phone Number, Appointment Date and Email below to access and download your report.
          </p>

          {/* Phone Input */}
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-400 px-3 py-2 text-sm rounded-md focus:outline-none focus:border-black w-64"
          />

          {/* Appointment Date Input */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-400 px-3 py-2 text-sm rounded-md focus:outline-none focus:border-black w-64"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 px-3 py-2 text-sm rounded-md focus:outline-none focus:border-black w-64"
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Show Download Button */}
          {phone && email && date && (
            <button 
              onClick={handleDownloadReport} 
              disabled={loading}
              className='border border-blue-600 px-8 py-4 text-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-500'
            >
              {loading ? "Fetching..." : "Download Report"}
            </button>
          )}

          <p className='font-semibold text-lg text-gray-600'>NEED HELP?</p>
          <p className='text-gray-500'>
            Any issues on downloading reports? Do contact us.
          </p>
          <p className='text-gray-500'>
            Tel: 033-23456789 <br /> Email: health.eapp.official@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}

export default Report
