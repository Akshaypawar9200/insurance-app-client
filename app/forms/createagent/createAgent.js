'use client'
import { useEffect, useState } from "react";
import Spinner from "../../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../../error/Error";
import { CreateNewAgent as CreateNewAgent } from "../../../lib/employee/CreateNewAgent";

const CreateAgent = ({handleSubmit}) => {
  const qualifications = [
    'BE Computer',
    'ME Computer',
    'MBA',
    'SSC',
    'HSC'

  ];

  const [isLoading, setIsLoading] = useState(false);
  const namePattern = /^[A-Za-z ]+$/;
  const [agentName, setAgentName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [agentAddress, setAgentAddress] = useState("");
  const [qualification, setQualification] = useState("");
  // const [role, setRole] = useState("")
  // const [employeeId, setEmployeeId] = useState()
  const [agentPhoto, setAgentPhoto] = useState()


  const handleUpload = (e) => {
    setAgentPhoto(prev => e.target.files[0])

  }
 let employeeId =localStorage.getItem("id")
  const handleCreateAgent = async (d) => {
    try {
      setIsLoading((prev) => true);
      if (agentName.length == 0 || !namePattern.test(agentName)) {

        throw new Error('Please enter a agentName (only letters and spaces allowed).');
      }
      if (username.length == 0 || !namePattern.test(username)) {

        throw new Error('Please enter a username (only letters and spaces allowed).');
      }

      if (password.length == 0) {
        throw new Error("invalid password");
      }
      if (email.length == 0) {
        throw new Error("invalid email");
      }
      if (agentAddress.length == 0 || !namePattern.test(agentAddress)) {

        throw new Error('Please enter a agentAddress (only letters and spaces allowed).');
      }

      if (qualification == "") {
        throw new Error("invalid qualification");
      }
     
      let data = {
        "agentName": agentName,
        // "role": role,
        "username": username,
        "password": password,
        "email": email,
        "agentAddress": agentAddress,
        "qualification": qualification,

      }
      const newData = JSON.stringify(data)
      let formdata = new FormData();
      formdata.append("image", agentPhoto);
      formdata.append("data", newData);
      console.log(":::::::::::::::::::::::::::::::::::::::::::")
      const response = await CreateNewAgent(formdata,employeeId)
      console.log(response.data);
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
      <Spinner isLoading={isLoading} />
      <div className="mx-auto w-[25%]">
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create Agent
              </h5>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Agent Name
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setAgentName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  agentAddress
                </label>
                <textarea
                  onChange={(e) => {
                    setAgentAddress(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                ></textarea>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Qualification
                </label>
                <select
                  value={qualification}
                  onChange={(e) => {
                    setQualification(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Select Qualification</option>
                  {qualifications.map((qualification, index) => (
                    <option key={index} value={qualification}>
                      {qualification}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>
                  upload Photo
                </label>
                <input type="file" onChange={handleUpload} />
              </div>
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleCreateAgent}
              >
                Add Agent
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAgent;
