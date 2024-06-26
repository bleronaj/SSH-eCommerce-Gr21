import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={'Contact Us'}>
<div className='row contactus'>
  <div className='col-md-6'>
    <img
    src='/images/contactus.jpeg'
    alt='contactus'
    style={{width:"100%"}}
    />
  </div>
  <div className='col-md-4'>
    <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
    <p className='text-justift mt-2'>
    Contact our support team for any questions or concerns regarding our products and services on our website.
    </p>
    <p className='mt-3'>
      <BiMailSend/> : www.help@ecommerceapp.com
    </p>
    <p className='mt-3'>
      <BiPhoneCall/> : +383 44 600 600
    </p>
    <p className='mt-3'>
 <BiSupport/> : 1000-0000-0000 (toll free)
    </p>
  </div>

</div>
    </Layout>
  )
}

export default Contact