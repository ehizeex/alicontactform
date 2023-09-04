"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { AiFillMail, AiOutlineFieldTime } from "react-icons/ai"
import { FaHeadphones } from "react-icons/fa";
export default function Home() {
  const [state,setState]=useState({
    name:'',
    email:'',
    phoneNumber:'',
    subject:'',
    message:'',
  })
  const [successMessage,setSuccessMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState("")
  const [loading,setLoading]=useState(false)

  
  const handleChange=(e)=>{
    const key=e.target.name;
    const value=e.target.value;

    setState({
      ...state,
      [key]:value
    })
  }

  const clearState=()=>{
    setState({
      name:'',
      email:'',
      phoneNumber:'',
      subject:'',
      message:'',
     
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    setLoading(true)
    let data = {
      ...state
    }
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(async(res) => {
      setLoading(false)
      const response= await res.json()
       if(!response.error){
         
         clearState()
         setSuccessMessage(response.message)
         setErrorMessage('')
       }
      else{
        clearState()
        setErrorMessage(response.message)
        setSuccessMessage('')
      }
    }).catch(e=>{
       clearState()
       setLoading(false)
       setErrorMessage("Something went wrong try again.")
       setSuccessMessage('')
    })
  }
  return (
    <>
    <div className="bg-gray-100 flex flex-col items-center justify-center pt-[80px] pb-[80px] px-[20px]">
    <div className="text-center bg-red-600 py-[1px] px-[8px] tracking-wide uppercase font-semibold text-[14px] text-white">
      Contact Details
    </div>
    <div className="mt-[10px]">
      <p className="md:text-[35px] sm:text-[30px] text-[25px] text-[#204669] font-semibold tracking-wide text-center">
        We Would Love To Help You !
      </p>
    </div>
    <div className="mt-[10px] md:w-[700px] w-auto text-center">
      <p>
        Turpis wisi pede tempus assumenda pede quis pretium. Aspernatur
        dolorem quod ultricies dicta ipsa, culpa condimentum do exercitation
        molestie, tincidunt quisque in eum, maecenas.
      </p>
    </div>
    <div className="sm:flex gap-[30px] mt-[30px]">
      <div className="flex xl:flex-row flex-col gap-[15px]">
        <div className="flex flex-col gap-[15px]  py-[35px] px-[45px]  bg-white shadow-lg">
          <div className="flex items-center gap-[15px]">
            <div>
              <FaLocationDot size={40} color="red" />
            </div>
            <div className="flex flex-col">
              <div className="text-red-500 text-[14px]">LOCATION...</div>
              <div className="font-semibold text-[20px] tracking-wide ">
                Visit Us At
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#666666]">65th Street, Los Angeles</div>
            <div className="text-[#666666]"> 3rd Street, San Andreas,</div>
          </div>
        </div>
        <div className="flex flex-col  py-[35px] px-[45px] gap-[15px] bg-white shadow-lg">
          <div className="flex items-center gap-[15px]">
            <div>
              <FiPhoneCall size={40} color="red" />
            </div>
            <div className="flex flex-col">
              <div className="text-red-500 text-[14px]">24*7 SERVICE..</div>
              <div className="font-semibold text-[20px] tracking-wide ">
                Call Us On
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#666666] ">Tel: +81 028874-83</div>
            <div className="text-[#666666]">Mob: +83 84793-43</div>
          </div>
        </div>
      </div>
      <div className="flex  xl:flex-row flex-col gap-[15px]">
        <div className="flex flex-col gap-[15px] py-[35px] px-[45px]  bg-white shadow-lg sm:mt-0 mt-[15px]">
          <div className="flex items-center gap-[15px]">
            <div>
              <AiFillMail size={40} color="red" />
            </div>
            <div className="flex flex-col">
              <div className="text-red-500 text-[14px]">Drop A Line</div>
              <div className="font-semibold text-[20px] tracking-wide ">
                Mail Address
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#666666]">info@Domain.com</div>
            <div className="text-[#666666]">Domain@Company.com</div>
          </div>
        </div>
        <div className="flex flex-col py-[35px]  px-[45px] gap-[15px] bg-white shadow-lg">
          <div className="flex items-center gap-[15px]">
            <div>
              <AiOutlineFieldTime size={40} color="red" />
            </div>
            <div className="flex flex-col">
              <div className="text-red-500 text-[14px]">OFFICE HOURS..</div>
              <div className="font-semibold text-[20px] tracking-wide ">
                Opening Time
              </div>
            </div>
          </div>
          <div>
            <div className="text-[#666666]">Mon – Fri : 9am – 6pm</div>
            <div className="text-[#666666]"> Sunday (Closed)</div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="flex flex-col xl:flex-row justify-center gap-[60px] bg-white mt-[60px] px-[30px]">
      <div
        className="relative w-full xl:w-[35 0px] h-[450px] bg-center bg-cover"
        style={{ backgroundImage: `url('/backgroundImage.jpg')` }}>
        <div className="absolute h-full w-full bg-gradient-to-t from-blue-900 via-blue-900 shadow-inner opacity-80"></div>
        <div className="absolute  inset-0 flex flex-col gap-[20px] items-center justify-center text-white shadow-lg p-6">
          <div className="text-4xl xl:mt-[150px] mt-0  rounded-full px-[15px] py-[15px] bg-blue-900 text-white">
            <FaHeadphones />
          </div>
          <div className=" font-semibold text-[24px]">Chat With Live!</div>
          <div>
            <p className="text-center">
              Porro. Erat gravida adipisci quibusdam faucibus diam molestias?
              Ante, arcu commodo, non! Phasellus risus tenetur.
            </p>
          </div>
          <div>
            <button className="bg-red-500 text-white mb-[30px]  px-4 py-2  hover:bg-red-700 transition-colors">
              LET'S CHAT
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="text-center w-[100px] bg-red-600 py-[1px]  tracking-wide uppercase font-semibold text-[14px] text-white">
          Contact Us
        </div>
        <div>
          <p className="text-[30px]">
            Request A Call Back ! Feel Free To Reach & Contact Us.
          </p>
        </div>
        <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit} >
          <div className="flex flex-col sm:flex-row gap-[20px]">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Your Name.."
              value={state.name}
              required
              className="px-[12px] outline-none  rounded-md py-[12px] flex-1 bg-gray-200"
            />
            <input
            name="email"
              type="email"
              required
              onChange={handleChange}
              value={state.email}
              placeholder="Your Email.."
              className="px-[12px] outline-none  rounded-md py-[12px] flex-1 bg-gray-200"
            />
          </div>
          <div className="flex flex-col sm:flex-row  gap-[20px]">
            <input
            name="phoneNumber"
              type="text"
              value={state.phoneNumber}
              required
              onChange={handleChange}

              placeholder="Your Number.."
              className="px-[12px] outline-none  rounded-md py-[12px] flex-1 bg-gray-200"
            />
            <input
              type="text"
              name="subject"
              placeholder="Your Subject.."
              required
              onChange={handleChange}

              value={state.subject}
              className="px-[12px] outline-none  rounded-md py-[12px] flex-1 bg-gray-200"
            />
          </div>
          <div>
            <textarea
            required
            name="message"
            onChange={handleChange}

            value={state.message}
              placeholder="Your Message"
              className="px-[12px] outline-none h-[80px] w-full  rounded-md py-[12px]  bg-gray-200"
            />
          </div>
          <div>
            {successMessage && <p className="text-green-600 font-bold p-2" >{successMessage}</p>}
            {errorMessage && <p className="text-red-600 font-bold p-2" >{errorMessage}</p>}
            {loading && <div className=" mb-3 ml-3 w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>}

            <button  className="bg-blue-900 sm:w-auto w-full px-[35px] py-[12px] hover:bg-red-800 transition-colors font-semibold text-white duration-500">
              SEND YOU MESSAGE
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  )
}
