import { routes } from '@/constants'
import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='text-slate-600'>
      <h1 className='font-bold text-center text-3xl mt-10 mb-5'>About Us</h1> 

      <p className='mb-3'>
      Welcome to <span className='font-bold'>JobEx</span>, your trusted platform for finding the perfect job or the ideal candidate. At <span className='font-medium'>JobEx</span>, we are dedicated to connecting passionate job seekers with forward-thinking employers across various industries. Our goal is to simplify the hiring process, making it more efficient and effective for everyone involved.
      </p>

      <h2 className='text-md font-bold mb-1'>Our Mission </h2> 

      <p className='mb-3'>At <span className='font-medium'>JobEx</span>, we believe that finding the right job or the right talent should be straightforward and stress-free. Our mission is to create a space where recruiters can easily post job opportunities and where job seekers can effortlessly discover and apply for positions that align with their skills, experience, and career goals.</p>

      <h2 className='text-md font-bold mb-1'>What We Offer </h2> 

      <ul className='list-disc pl-5 mb-4'>
        <li className='mb-2'>
          <strong>For Job Seekers:</strong> <span className='font-medium'>JobEx</span> provides a user-friendly platform where you can search for jobs based on your preferences, be it industry, location, or job type. With a wide range of listings from companies of all sizes, we help you find opportunities that match your unique qualifications and aspirations.
        </li>
        <li className='mb-2'>
          <strong>For Recruiters:</strong> <span className='font-medium'>JobEx</span> simplifies the recruitment process, allowing you to post job openings quickly and reach a vast pool of qualified candidates. Our platform is designed to help you find the right fit for your organization, whether you’re looking for experienced professionals or fresh talent.
        
        </li>
      </ul>

      <h2 className='text-md font-bold mb-1'>Our Vision </h2> 

      <p className='mb-2'>We envision a world where every individual finds a job they love and every company finds the talent they need to succeed. At <span className='font-medium'>JobEx</span>, we are committed to making that vision a reality by continually improving our platform and services.</p>

      <h2 className='text-md font-bold mb-1'>Why Choose Jobex</h2> 
      <ul className='list-disc pl-5 mb-4'>
        <li className='mb-2'>
          <strong>Easy to Use:</strong> Our platform is designed with simplicity in mind, making it easy for both job seekers and recruiters to navigate.
        </li>
        <li className='mb-2'>
          <strong>Diverse Opportunities:</strong> We cater to a wide range of industries and job types, ensuring that there’s something for everyone.
        </li>
        <li className='mb-2'>
          <strong>Reliable Support:</strong> Our team is here to assist you every step of the way, whether you need help posting a job or finding the right position.
        
        </li>
      </ul>
      
      <h2 className='text-md font-bold mb-1'>Join Us</h2> 
      Whether you’re looking to advance your career or grow your team, <span className='font-medium'>JobEx</span> is here to help. <Link to={routes.signup} className='cursor-pointer text-orange-700'>Join</Link> our community today and take the next step towards success.
    </div>
  )
}

export default About