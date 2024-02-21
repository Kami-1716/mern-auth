import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import app from '../firebase/firebase'

const Profile = () => {
  const user = useSelector(state => state.user)
  const filePickerRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [progress, setProgress] = useState(0)
  const [imageUploadError, setImageUploadError] = useState(null)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (image) {
      handleUpload(image)
    }

  }, [image])

  const handleUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = `${image.name}${Date.now()}`
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setProgress(Math.round(progress))
    }, (error) => {
      setImageUploadError(error)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, profilePic: downloadURL })
      });
    });
  }




  return (
    <div className='p-2'>
      <h1
        className='text-center mt-5 text-3xl font-semibold my-7'
      >Profile</h1>
      <form
        className='flex flex-col items-center'>
        <input type='file'
          ref={filePickerRef}
          accept='image/*'
          style={{ display: 'none' }}
          onChange={(e) => {
            setImage(e.target.files[0])
          }}
        />
        <img
          src={formData.profilePic || user.currentUser.profilePic}
          className='rounded-full h-28 w-28 object-cover cursor-pointer'
          onClick={() => filePickerRef.current.click()}
        />
        <p>
          {imageUploadError ? (
            <span className='text-red-500'>Error in Uploading Image</span>
          ) : (
            progress > 0 && progress < 100 ? (<span className='text-green-500'>
              Uploading {progress}%
            </span>) : progress === 100 ? (<span className='text-green-500'>
              Image Uploaded Successfully
            </span>) : ""

          )}
        </p>
        <input
          type='text'
          className=' p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          value={user.currentUser.username}
          disabled
        />
        <input
          type='email'
          className=' p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          value={user.currentUser.email}
          disabled
        />
        <input
          type='password'
          className=' p-3 bg-gray-100 max-w-md w-full outline-none mx-2 my-2'
          placeholder='Password'
        />
        <button
          className='p-3 bg-blue-500 max-w-md w-full mx-2 my-2 font-bold text-white hover:bg-blue-600 transition duration-200'>
          Update
        </button>
      </form>
      <div className='flex justify-between max-w-md mx-auto mt-3'>
        <span className='
          text-red-500 cursor-pointer
          '>Delete Account</span>
        <span className='
          text-red-500 cursor-pointer
          '>Sign Out</span>

      </div>
    </div>
  )
}

export default Profile