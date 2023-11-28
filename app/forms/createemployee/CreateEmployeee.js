import { useEffect, useState } from "react";
import Spinner from "../../../sharedcomponent/spinner/Spinner";
import { MessageError, MessageSuccess } from "../../../error/Error";
import { CreateNewEmployee as CreateNewEmployee } from "../../../lib/employee/CreateNewEmployee";
import { SnackbarProvider } from "notistack";
const CreateEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const namePattern = /^[A-Za-z ]+$/;
  const [role, setRole] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [empPhoto, setEmpPhoto] = useState()


  const handleCreateEmployee = async (e) => {
   
    try {
      setIsLoading((prev) => true);
     
      if (role.length==0) {
        throw new Error("invalid role");
      }
      if (employeeName.length==0||!namePattern.test(employeeName)) {
       
        throw new Error('Please enter a employeeName (only letters and spaces allowed).');
      }
      
      if (username.length==0||!namePattern.test(username)) {
       
        throw new Error('Please enter a username (only letters and spaces allowed).');
      }
      if (password.length == 0) {
        throw new Error("invalid password");
      }
      if (email.length == 0) {
        throw new Error("invalid email");
      }

      const formData=new FormData()
      let data={
        "employeeName":employeeName,
        "role":role,
        "username":username,
        "password":password,
        "email":email
      }
      console.log("?????????????????????????",data);
      const newData=JSON.stringify(data)
      let formdata = new FormData();
      formdata.append("image", empPhoto);
      formdata.append("data",newData );
      const response = await CreateNewEmployee(formdata)
      console.log(response.data);

      MessageSuccess("Created Added");
      return;
    } catch (error) {
      MessageError(error.message);
    } finally {
      setIsLoading((prev) => false);
    }
  };
  const handleUpload=(e)=>{
    setEmpPhoto(prev=>e.target.files[0])
    
  }
 
  return (
    <>
        <SnackbarProvider autoHideDuration={3000}/>
      <Spinner isLoading={isLoading} />
      <div className="mx-auto w-[25%]">
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create Employee
              </h5>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Employee Name
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setEmployeeName(e.target.value);
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
                  role
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value="">select</option>
              
                  <option value="Employee">employee</option>
                </select><br></br>
              </div>
              <div>
                <label>
                    upload Photo
                  </label>
                  <input type="file"  onChange={handleUpload}/>
              </div>
              <button
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleCreateEmployee}
              >
                Add Employee
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmployee;
