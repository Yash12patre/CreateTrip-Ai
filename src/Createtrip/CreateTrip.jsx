import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/Options';
import { Button } from '@/components/ui/button';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { LUND } from '@/constants/Options';
import { chatSession } from '@/service/AiModel';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {doc, setDoc} from "firebase/firestore"
import { db } from "@/service/FirebaseConfig"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Navigate, useNavigate } from 'react-router-dom';



function CreateTrip() {

  const [Place, setPlace] = useState();

  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);
  const [loading , setLoading]=useState(false);

  const router=useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDailog(true)
      return;
    }
    const { noOfDays, budget, location, traveler } = formData;
    console.log('Form Data:', formData);
    console.log('noOfDays:', noOfDays);
    console.log('location:', location);
    console.log('budget:', budget);
    console.log('traveler:', traveler);
    if (!location || !budget || !traveler || !noOfDays || noOfDays < 1 || noOfDays > 10) {
      toast('Please fill all details correctly');
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = LUND
      .replace('{location}', formData?.location?.label)
      .replace('{budget}', formData?.budget)
      .replace('{traveler}', formData?.traveler)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{totalDays}', formData?.totalDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text())
      setLoading(false);
      SaveAiTrip(result?.response?.text())
    } catch (error) {
      console.log("Error occurred during AI chat session:", error);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId

    });
    setLoading(false);
    router('/view-trip/'+docId)
  }

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      OnGenerateTrip();
    })
  }


  useEffect(() => {
    console.log('Form Data:', formData);
  }, [formData]);




  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-inter font-bold text-3xl'>Tell is your treavel preference</h2>
      <p className='mt-3  text-xl text-gray-700'>Just provide some basic information, and our trip planner will generate a customized itienary based on your preference</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div >

          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGEL_PLACE_API_KEY}
            selectProps={{
              onChange: (v) => handleInputChange('location', v),
              value: formData?.location,
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium '>How many days ar you planing your trip</h2>
          <Input
            placeholder={"Ex-3"}
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            type="number"
          />
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelsList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('traveler', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
              ${formData?.traveler == item.title && 'shadow-lg border-black'}
              `}>
              <h2 className='text-2xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sx font-bold text-gray-500'>{item.desc}</h2>
            </div>

          ))}
        </div>

      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                 ${formData?.budget == item.title && 'shadow-lg border-black'}
              `}>
              <h2 className='text-2xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sx font-bold text-gray-500'>{item.desc}</h2>
            </div>

          ))}
        </div>

      </div>
      <div className='mt-10 mb-10 flex justify-end'>
        <Button 
        disabled={loading}
        onClick={OnGenerateTrip}>
        {loading? 
      <AiOutlineLoading3Quarters  className='h-7 w-7 animate-spin'/> : " Generate Trip"

  
      } 
      </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>

            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
              <p>Sign In to the App with Google Authentication</p>
              <Button
              
                onClick={login}
                className="w-full mt-5 flex gap-2 items-center">
                  
                   <FcGoogle className='h-7 w-7' />
                Sign In with Google
               
                </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip