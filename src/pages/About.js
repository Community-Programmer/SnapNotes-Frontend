import React from 'react'
import { useEffect } from 'react'
import '../css/About.css'

const About = ({setProgress}) => {

    useEffect(()=>{
        setProgress(10)
        setTimeout(()=>{
          setProgress(100)
        },500)
      },[setProgress])
  return (
    <div className="about-container">
        <h1>About Us - <span>SnapNotes</span></h1>
        <p>Welcome to SnapNotes, your go-to destination for seamless note-taking and organization in the digital era. We understand the significance of capturing ideas on the go, and that's why we've crafted a powerful and user-friendly platform to meet all your note-related needs.</p>
        <h2>Our Vision:</h2>
        <p>At SnapNotes, we envision a world where your thoughts are effortlessly translated into digital notes, securely stored on the cloud for anytime, anywhere access. We believe in simplicity, functionality, and the transformative power of organized ideas.</p>
        <h2>Key Features:</h2>
        <li><b>Cloud Storage:</b>Your notes are securely stored in the cloud, ensuring that they are accessible whenever and wherever you need them. Say goodbye to the limitations of device-specific storage.</li>
        <li><b>Intuitive Interface:</b>We believe in keeping things simple. The user-friendly interface of SnapNotes ensures that creating, updating, and managing your notes is a breeze.</li>
        <li><b>Versatility:</b> Whether you're jotting down a quick idea, creating a to-do list, or drafting a detailed note, SnapNotes adapts to your needs. It's the one-stop solution for all your note-taking requirements.</li>
        <li><b>Security:</b>We prioritize the security of your data. SnapNotes employs state-of-the-art encryption to safeguard your notes, ensuring that your ideas remain confidential</li>
        <h2>Our Creator</h2>
        <p>SnapNotes was brought to life by Sarthak Patel, a dedicated developer and the mind behind the code. Sarthak is passionate about creating solutions that simplify your digital life. Connect with Sarthak on GitHub: Community-Programmer and explore his portfolio at Sarthak Patel's Portfolio</p>
        <h2>Our Commitment</h2>
        <p>We are dedicated to continually improving and expanding the capabilities of SnapNotes. Your feedback is invaluable to us, and we actively incorporate user suggestions to make our app even better. Our commitment is to provide you with a reliable, efficient, and enjoyable note-taking experience.</p>
        <h2>Join Us on the Journey</h2>
        <p>Embark on a note-taking journey with us at SnapNotes. Whether you're a student, professional, creative mind, or anyone in between, we're here to simplify your life one note at a time.</p>
        <p>Thank you for choosing SnapNotes - where your ideas find a home in the digital realm</p>
    </div>
  )
}

export default About