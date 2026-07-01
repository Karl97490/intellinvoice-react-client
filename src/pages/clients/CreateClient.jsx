import { NavLink, Link } from "react-router-dom";
import { Eye, Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { PencilLine } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import clientService from "../../services/client.services";

const CreateClient = () => {
  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("submitting...");
    e.preventDefault();
    setIsLoading(true);
    const body = {
      ownerId: userId,
      ...clientForm,
    };
    try {
      const response = await clientService.createClient(body);
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div role="status" className="w-fit mx-auto">
        <svg
          aria-hidden="true"
          className="inline w-12 h-12 w-10 h-10 text-neutral-tertiary animate-spin fill-brand"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:ml-64 mt-14">
      <div className="p-4 border border-default border-dashed rounded-base">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 flex-1">
            <div className="p-5 col-span-3 rounded-base bg-neutral-secondary-soft border border-zinc-100">
              <div className="flex gap-1 items-center">
                <h2 className="text-xl font-semibold">Create Client</h2>
              </div>
              <p className="text-fg-disabled block">
                Create and manage your clients
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 xl:grid-cols-2 gap-4 flex-1 place-items-center">
            <div className="w-[80%] col-span-3 space-y-1 md:space-y-2 p-6 sm:p-8 bg-white border border-zinc-200 rounded-base shadow-xs">
              <h1 className="flex justify-between text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Client Informations
                <button
                  type="submit"
                  className="flex cursor-pointer items-center max-h-15 max-w-30 justify-center gap-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Save Client
                </button>
              </h1>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Name
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="name"
                    placeholder="Company Name"
                    value={clientForm.name}
                    onChange={handleChange}
                    required={true}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Email
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    value={clientForm.email}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Address
                  <textarea
                    className="resize-none overflow-y-auto bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    rows="3"
                    placeholder="3 road John Doe"
                    name="address"
                    value={clientForm.address}
                    onChange={handleChange}
                    required={true}
                  ></textarea>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Phone
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="phone"
                    name="phone"
                    placeholder="22-56-59-74"
                    value={clientForm.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClient;
