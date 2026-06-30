import { NavLink, Link } from "react-router-dom";
import { Eye, Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { PencilLine } from "lucide-react";
import { useContext, useState } from "react";
import authService from "../../services/auth.service";
import invoiceService from "../../services/invoice.service";
import { AuthContext } from "../../context/auth.context";

const CreateInvoice = () => {
  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({
    invoiceNumber: "",
    owner: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
    client: {
      name: "",
      email: "",
      address: "",
      phone: "",
    },
    items: [
      {
        title: "Web Dev",
        type: "product",
        quantity: 1,
        taxRate: 2.5,
        unitPrice: 600,
      },
    ],
    status: "unpaid",
    issuedDate: "",
    dueDate: "",
    total: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const section = e.target.dataset.section;
    // console.log(section, name, value);
    if (section) {
      setInvoiceForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
      return;
    }

    setInvoiceForm((prev) => ({
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
      ...invoiceForm,
    };
    try {
      const response = await invoiceService.createInvoice(body);
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
            <div className="flex justify-between items-end p-5 col-span-3 rounded-base bg-neutral-secondary-soft border border-zinc-100">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <h2 className="text-xl font-semibold">Create Invoice</h2>
                </div>
                <p className="text-fg-disabled">
                  Create and generate customer invoices
                </p>
              </div>
              <button
                type="submit"
                className="flex cursor-pointer items-center max-h-15 max-w-30 justify-center gap-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Save Invoice
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 bg-white border border-zinc-200 rounded-base shadow-xs p-5">
            <label className="block text-base font-medium text-gray-900 w-full">
              Invoice Number
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="number"
                name="invoiceNumber"
                placeholder="INV-1001"
                value={invoiceForm.invoiceNumber}
                onChange={handleChange}
                min={0}
                required={true}
              />
            </label>
            <label className="block text-base font-medium text-gray-900 w-full">
              Issued Date
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-body"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                    />
                  </svg>
                </div>
                <input
                  className="block w-full ps-9 pe-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 mt-1 focus:border-primary-600 focus:ring-brand px-3 rounded  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  datepicker=""
                  id="issued-datepicker"
                  type="text"
                  name="issuedDate"
                  // value={invoiceForm.issuedDate}
                  // onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                />
              </div>
            </label>
            <label className="block text-base font-medium text-gray-900 w-full">
              Due Date
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-body"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                    />
                  </svg>
                </div>
                <input
                  className="block w-full ps-9 pe-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 mt-1 focus:border-primary-600 focus:ring-brand px-3 rounded  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  datepicker=""
                  id="due-datepicker"
                  type="text"
                  // value={invoiceForm.dueDate}
                  // onChange={handleChange}
                  placeholder="mm/dd/yyyy"
                />
              </div>
            </label>
          </div>
          <div className="grid grid-cols-[1fr] xl:grid-cols-2 gap-4 flex-1">
            <div className="space-y-1 md:space-y-2 p-6 sm:p-8 bg-white border border-zinc-200 rounded-base shadow-xs">
              <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Bill From
              </h1>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Name
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="name"
                    data-section="owner"
                    placeholder="Company Name"
                    value={invoiceForm.owner.name}
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
                    data-section="owner"
                    placeholder="name@company.com"
                    value={invoiceForm.owner.email}
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
                    data-section="owner"
                    value={invoiceForm.owner.address}
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
                    data-section="owner"
                    value={invoiceForm.owner.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="space-y-1 md:space-y-2 p-6 sm:p-8 bg-white border border-zinc-200 rounded-base shadow-xs">
              <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Bill To
              </h1>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Name
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="name"
                    placeholder="Company Name"
                    data-section="client"
                    value={invoiceForm.client.name}
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
                    data-section="client"
                    value={invoiceForm.client.email}
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
                    data-section="client"
                    value={invoiceForm.client.address}
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
                    data-section="client"
                    value={invoiceForm.client.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 flex-1 bg-white border border-zinc-200 rounded-base shadow-xs">
            <div className="col-span-3 overflow-x-auto rounded-base">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <caption className="p-5 text-xl font-semibold text-left rtl:text-right text-heading relative">
                  <div className="flex w-full justify-between items-end">
                    <div>
                      Items
                      <p className="mt-1.5 text-sm font-normal text-body">
                        Add your items to the invoice
                      </p>
                    </div>
                    <button
                      type="button"
                      className="flex cursor-pointer items-center max-h-15 justify-center gap-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                      <Plus size={18} />
                      Add Items
                    </button>
                  </div>
                </caption>
                <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-t border-default-medium">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          id="table-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                        />
                        <label htmlFor="table-checkbox" className="sr-only">
                          Table checkbox
                        </label>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Unit Price
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Tax (%)
                    </th>
                    <th scope="col" className="px-8 py-3 font-medium">
                      Total
                    </th>
                    <th scope="col" className="px-8 py-3 font-medium">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-neutral-primary-soft border-b border-default">
                    <td className="p-4">
                      <div className="flex items-center">
                        <input
                          id="table-checkbox-1"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                        />
                        <label htmlFor="table-checkbox-1" className="sr-only">
                          Table checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap"
                    >
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        name="title"
                        placeholder="Title"
                        data-section="items"
                        value={undefined}
                        onChange={undefined}
                        // required={true}
                      />
                    </th>
                    <td className="px-6 py-4">
                      <div className="relative flex items-center max-w-[10rem] bg-gray-50 text-gray-900 rounded-lg">
                        <button
                          type="button"
                          id="decrement-button"
                          data-input-counter-decrement="quantity-input"
                          className="text-body bg-neutral-secondary-medium box-border border border-gray-300 hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-s-base text-sm px-3 focus:outline-none h-10"
                        >
                          <svg
                            className="w-4 h-4 text-heading"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 12h14"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="quantity-input"
                          data-input-counter
                          aria-describedby="helper-text-explanation"
                          className="border-x-0 h-10 placeholder:text-heading text-center w-full bg-neutral-secondary-medium border-gray-300 py-2.5 placeholder:text-body"
                          placeholder="0"
                          // required
                        />
                        <button
                          type="button"
                          id="increment-button"
                          data-input-counter-increment="quantity-input"
                          className="text-body bg-neutral-secondary-medium box-border border border-gray-300 hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-e-base text-sm px-3 focus:outline-none h-10"
                        >
                          <svg
                            className="w-4 h-4 text-heading"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 12h14m-7 7V5"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={undefined}
                        onChange={undefined}
                        // required={true}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        className="max-w-[6rem] bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="number"
                        name="tax"
                        placeholder="0%"
                        value={undefined}
                        onChange={undefined}
                        // required={true}
                      />
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-heading text-base font-body">
                        $19963
                      </span>
                    </td>
                    <td className="px-4 pr-5 py-4">
                      <div className="flex gap-x-6 justify-between">
                        <button
                          onClick={undefined}
                          className="font-medium text-fg-brand cursor-pointer"
                        >
                          <PencilLine size={16} />
                        </button>
                        <button
                          onClick={undefined}
                          className="font-medium text-red-500 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 ">
            <div className="flex items-center justify-center h-60 bg-white border border-zinc-200 rounded-base shadow-xs">
              <p className="text-fg-disabled">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-60 bg-white border border-zinc-200 rounded-base shadow-xs">
              <p className="text-fg-disabled">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
