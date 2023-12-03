import { useEffect, useState } from "react";
import Spinner from "../../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../../error/Error";
import { CreateNewEmployee as CreateNewEmployee } from "../../../lib/employee/CreateNewEmployee";
import { SnackbarProvider } from "notistack";
import { CreateNewInsurance } from "@/lib/employee/Insurance";
import { CreateNewState } from "@/lib/state/CreateState";
import { CreateNewCity, getStateById } from "@/lib/city/CreateCity";
import { getAllState } from "@/lib/state/GetAllState";

const CreateCity = ({handleSubmit}) => {
  const [isLoading, setIsLoading] = useState(false);
  const namePattern = /^[A-Za-z ]+$/;
  const [role, setRole] = useState("");
  const [stateName, setStateName] = useState("");
  const [city, setcity] = useState("");

  const [cityName, setcityName] = useState([]);
  const [indianStates, setIndianStates] = useState([]);
  const [change,setChange]=useState(true)
  
  useEffect(() => {
   handleCity()
 }, [change])
 useEffect(() => {
  handleGetAllState()
}, [])

 const handleCity=async()=>{
 const response=await getStateById(stateName)
 console.log("hello",await response.data.stateName)

 if(await response.data.stateName=="Assam"){

  setcityName(prev=>["Guwahati",
    "Dispur",
    "Silchar",
    "Dibrugarh",
    "Jorhat",
    "Nagaon",
    "Tezpur",
    "Tinsukia",
    "Barpeta",
    "Goalpara"])
 }
 if(response.data.stateName=="Andhra Pradesh"){

  setcityName(prev=>[
    "Amaravati",
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Kadapa",
    "Rajahmundry",
    "Tirupati",
    "Anantapur",
    "Eluru",
    "Ongole",
    "Kakinada",
    "Machilipatnam",
    "Tenali"
  ])
 } if(response.data.stateName=="Bihar"){

  setcityName(prev=>[
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Darbhanga",
    "Arrah",
    "Bihar Sharif",
    "Munger",
    "Chhapra",
    "Purnia",
    "Siwan",
    "Motihari",
    "Katihar",
    "Sasaram",
    "Hajipur",
  ])
 } if(response.data.stateName=="Arunachal Pradesh"){

  setcityName(prev=>[
    "Itanagar",
    "Naharlagun",
    "Pasighat",
    "Along",
    "Tezu",
    "Bomdila",
    "Aalo",
    "Tawang",
    "Ziro",
    "Roing",
  ])
 } if(response.data.stateName=="Chhattisgarh"){

  setcityName(prev=>[
    "Raipur",
    "Bhilai",
    "Durg",
    "Bilaspur",
    "Korba",
    "Rajnandgaon",
    "Raigarh",
    "Jagdalpur",
    "Ambikapur",
    "Chirmiri",
    "Dhamtari",
    "Mahasamund",
    "Durg-Bhilai Nagar",
    // ... add more cities as needed
  ])
 } if(response.data.stateName=="Goa"){

  setcityName(prev=>[
    "Panaji",
    "Vasco da Gama",
    "Margao",
    "Mapusa",
    "Ponda",
    "Bicholim",
    "Curchorem",
    "Cuncolim",
    "Canacona",
    "Valpoi",
  ])
 } if(response.data.stateName=="Gujarat"){

  setcityName(prev=>[
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Junagadh",
    "Gandhinagar",
    "Nadiad",
    "Morbi",
    "Surendranagar",
    "Bharuch",
    "Anand",
    "Porbandar",
    "Godhra",
  ])
 }
 
 if(response.data.stateName=="Haryana"){

  setcityName(prev=>[
    "Chandigarh",
    "Faridabad",
    "Gurugram",
    "Ambala",
    "Hisar",
    "Panipat",
    "Karnal",
    "Rohtak",
    "Sonipat",
    "Yamunanagar",
    "Panchkula",
    "Kurukshetra",
    "Kaithal",
    "Bhiwani",
    "Jind",
  ])
 }
 if(response.data.stateName=="Himachal Pradesh"){

  setcityName(prev=>[
    "Shimla",
    "Mandi",
    "Solan",
    "Dharamshala",
    "Kullu",
    "Manali",
    "Palampur",
    "Bilaspur",
    "Hamirpur",
    "Una",
    "Chamba",
    "Nahan",
    "Sirmaur",
    "Lahaul and Spiti",
  ])
 }
 if(response.data.stateName=="Jharkhand"){

  setcityName(prev=>[
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro Steel City",
    "Hazaribagh",
    "Deoghar",
    "Giridih",
    "Ramgarh",
    "Chatra",
    "Medininagar (Daltonganj)",
    "Phusro",
    "Chirkunda",
    "Jhumri Tilaiya",
    // ... add more cities as needed
  ])
 }
 if(response.data.stateName=="Karnataka"){

  setcityName(prev=>[
    "Bengaluru (Bangalore)",
    "Mysuru (Mysore)",
    "Hubballi (Hubli)",
    "Mangaluru (Mangalore)",
    "Belagavi (Belgaum)",
    "Dharwad",
    "Kalaburagi (Gulbarga)",
    "Vijayapura (Bijapur)",
    "Ballari (Bellary)",
    "Bidar",
    "Shivamogga (Shimoga)",
    "Tumakuru (Tumkur)",
    "Davanagere",
    "Raichur",
    "Hosapete (Hospet)",
    // ... add more cities as needed
  ])
 }
 if(response.data.stateName=="Kerala"){

  setcityName(prev=>[
    "Thiruvananthapuram",
    "Kochi (Cochin)",
    "Kozhikode (Calicut)",
    "Thrissur",
    "Kollam",
    "Alappuzha",
    "Kannur",
    "Kottayam",
    "Palakkad",
    "Malappuram",
    "Pathanamthitta",
    "Idukki",
    "Ernakulam",
    "Wayanad",
  ])
 }
 if(response.data.stateName=="Madhya Pradesh"){
console.log("helo")
  setcityName(prev=>[
    "Bhopal",
    "Indore",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Sagar",
    "Dewas",
    "Satna",
    "Ratlam",
    "Rewa",
    "Singrauli",
    "Burhanpur",
    "Khandwa",
    "Guna",
    "Shivpuri",
    // ... add more cities as needed
  ])
 }
 if(response.data.stateName=="Maharashtra"){

  setcityName(prev=>[
    "Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Kolhapur",
    "Amravati",
    "Nanded",
    "Sangli",
    "Jalgaon",
    "Akola",
    "Latur",
    "Dhule",
    // ... add more cities as needed
  ])
 }
 if(response.data.stateName=="Manipur"){

  setcityName(prev=>[
    "Imphal",
    "Thoubal",
    "Bishnupur",
    "Churachandpur",
    "Kakching",
    "Ukhrul",
    "Senapati",
    "Tamenglong",
    "Jiribam",
    // ... add more cities as needed
  ])
 }
if(response.data.stateName=="Meghalaya"){

  setcityName(prev=>[
    "Shillong",
    "Tura",
    "Jowai",
    "Nongstoin",
    "Baghmara",
    "Williamnagar",
    "Resubelpara",
    "Khliehriat",
    // ... add more cities as needed
  ])
 } if(response.data.stateName=="Mizoram"){

  setcityName(prev=>[
    "Aizawl",
    "Lunglei",
    "Saiha",
    "Champhai",
    "Kolasib",
    "Serchhip",
    "Lawngtlai",
    // ... add more cities as needed
  ])
 } if(response.data.stateName=="Odisha"){

  setcityName(prev=>[
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Puri",
    "Sambalpur",
    "Balasore",
    "Jharsuguda",
    "Brahmapur (Berhampur)",
    "Bargarh",
    "Baripada",
    "Bhadrak",
    "Koraput",
    "Jagatsinghpur",
    "Kendujhar (Keonjhar)",
    "Phulabani"  ])
 } if(response.data.stateName=="Punjab"){

  setcityName(prev=>[
    "Amritsar",
    "Ludhiana",
    "Jalandhar",
    "Patiala",
    "Bathinda",
    "Hoshiarpur",
    "Mohali",
    "Pathankot",
    "Moga",
    "Batala",
    "Abohar",
    "Khanna",
    "Ropar (Rupnagar)",
    "Fazilka",
    "Faridkot"  ])
 } if(response.data.stateName=="Rajasthan"){

  setcityName(prev=>[
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Ajmer",
    "Kota",
    "Bikaner",
    "Alwar",
    "Sikar",
    "Bharatpur",
    "Pali",
    "Ganganagar",
    "Bhilwara",
    "Aligarh",
    "Mount Abu",
   "Chittorgarh"  ])
 } if(response.data.stateName=="Sikkim"){

  setcityName(prev=>[
    "Gangtok",
    "Namchi",
    "Pelling",
    "Ravangla",
    "Yuksom",
    "Lachung",
    "Lachen",
    "Gyalshing",
    "Mangan"  ])
 } if(response.data.stateName=="Tamil Nadu"){

  setcityName(prev=>[
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Erode",
    "Vellore",
    "Thoothukudi",
    "Dindigul",
    "Thanjavur",
    "Tiruppur",
    "Karur",
    "Nagercoil",
    "Kancheepuram"  ])
 } if(response.data.stateName=="Telangana"){

  setcityName(prev=>[
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Khammam",
    "Karimnagar",
    "Ramagundam",
    "Mahbubnagar",
    "Nalgonda",
    "Adilabad",
    "Suryapet",
    "Miryalaguda",
    "Jagtial",
    "Nirmal",
    "Kamareddy"
  ])
 } if(response.data.stateName=="Tripura"){

  setcityName(prev=>[
    "Agartala",
    "Udaipur",
    "Dharmanagar",
    "Ambassa",
    "Kailashahar",
    "Belonia",
    "Sabroom"
  ])
 }
 if(response.data.stateName=="Uttar Pradesh"){
  
    setcityName(prev=>[
      "Lucknow",
      "Kanpur",
      "Agra",
      "Varanasi",
      "Allahabad (Prayagraj)",
      "Meerut",
      "Ghaziabad",
      "Noida",
      "Gorakhpur",
      "Jhansi",
      "Moradabad",
      "Aligarh",
      "Bareilly",
      "Faizabad",
      "Mathura",
      // ... add more cities as needed
    ])
   }if(response.data.stateName=="Uttarakhand"){
      setcityName(prev=>[
        "Dehradun",
        "Haridwar",
        "Rishikesh",
        "Nainital",
        "Mussoorie",
        "Haldwani",
        "Rudrapur",
        "Kashipur",
        "Roorkee",
        "Almora",
        "Pithoragarh",
        "Chamoli",
        "Pauri",
        "Tehri",
        "Udham Singh Nagar",
        // ... add more cities as needed
      ])
     }if(response.data.stateName=="West Bengal"){
      
        setcityName(prev=>[
          "Kolkata",
          "Howrah",
          "Durgapur",
          "Asansol",
          "Siliguri",
          "Darjeeling",
          "Malda",
          "Kharagpur",
          "Haldia",
          "Bardhaman",
          "Baharampur",
          "Raniganj",
          "Jalpaiguri",
          "Krishnanagar",
          "Raiganj",
          // ... add more cities as needed
        ])
       }if(response.data.stateName=="Jammu and Kashmir"){
        
          setcityName(prev=>[
            "Srinagar",
            "Jammu",
            "Anantnag",
            "Baramulla",
            "Udhampur",
            "Kathua",
            "Sopore",
            "Rajouri",
            "Pulwama",
            "Kupwara",
            "Banihal",
            "Doda",
            "Pahalgam",
            "Gulmarg",
            "Leh",
            "Kargil",
            // ... add more cities as needed
          ])
         }if(response.data.stateName=="Ladakh"){
          
            setcityName(prev=>[
              "Leh",
              "Kargil",
              "Nubra Valley",
              "Zanskar Valley",
              "Pangong Lake",
              "Drass",
              "Hemis",
              "Lamayuru",
              // ... add more towns and areas as needed
            ])
           }
}  

  const handleGetAllState=async()=>{
    const response=await getAllState()
    setIndianStates((prev)=>response.data)
  }

  const handleCreateCity = async (e) => {
   e.preventDefault()
    try {
      setIsLoading((prev) => true);
    
      // if (stateName.length==0||!namePattern.test(stateName)) {
       
      //   throw new Error('Please enter a stateName (only letters and spaces allowed).');
    
      // }
      if (city.length==0||!namePattern.test(city)) {
       
        throw new Error('Please enter a stateName (only letters and spaces allowed).');
    
      }
     
     
    const data={
      cityName:city
    }
    
      const response = await CreateNewCity(data,stateName)
      handleSubmit()

      MessageSuccess("Created Added");
      return;
    } catch (error) {
      MessageError(error.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };

 
  return (
    <>
        <SnackbarProvider autoHideDuration={3000}/>
      <Spinner isLoading={isLoading} />
      <div className="mx-auto w-[25%]">
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create City
              </h5>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select State
                </label>
               
              </div>
              <select
          onChange={(e) => {
         
            setStateName(prev=>e.target.value)
            
           setChange(prev=>!(prev))
          }
        }
          
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select State</option>
          {indianStates.map((state, index) => (
            <option key={index} value={state.id} >
              {state.stateName}
            </option>
          ))}
        </select>
        <div>
               
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                city Name
                </label>
                {/* <input
                  type="text"
                  onChange={(e) => {
                    console.log(cityName)
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input> */}
                 <select
          onChange={(e) => {
            setcity((prev)=>e.target.value)
          }
        }
          
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select State</option>
          {cityName.map((state, index) => (
            <option key={index} value={state} >
              {state}
            </option>
          ))}
        </select>
              </div>
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleCreateCity}
              >
                Create City
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCity;
