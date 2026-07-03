import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import invoiceService from "../../services/invoice.service";
import InvoiceRow from "../../components/invoices/InvoiceRow";
import useDebounce from "../../hooks/useDebounce";

import { Datepicker, DropdownItem } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { Pagination } from "flowbite-react";

const Invoices = () => {
  const [invoices, setInvoices] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [invoiceStats, setInvoiceStats] = useState({
    totalInvoices: 0,
    totalAmount: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: Math.floor(invoices?.length / 10),
    totalItems: invoices?.length,
    limit: 10,
  });

  // const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState({
    search: "",
    issuedDate: null,
    dueDate: null,
    status: {
      paid: false,
      unpaid: false,
      overdue: false,
      pending: false,
    },
  });

  // const searchQueryDebounced = useDebounce(filterQuery.search); // okay to put this here?

  useEffect(() => {
    getData();
  }, [
    filterQuery.search,
    filterQuery.issuedDate,
    filterQuery.dueDate,
    filterQuery.status,
  ]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const section = e.target.dataset.section;
    if (section === "status") {
      setFilterQuery((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: checked,
        },
      }));
      return;
    }
    setFilterQuery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeDate = (date, field) => {
    // console.log(date, field);
    setFilterQuery((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const getData = async () => {
    try {
      const response = await invoiceService.getAllInvoices(filterQuery);
      const statsResponse = await invoiceService.getInvoicesStats();
      console.log(filterQuery);
      console.log(response);
      setIsLoading(false);
      setInvoices(response.data);
      setInvoiceStats(statsResponse.data);
    } catch (error) {
      console.log(error.response);
      // navigate("/error"); // internal servor error page
    }
  };

  const handleDelete = async (invoiceId) => {
    console.log("delete invoice with id: " + invoiceId);
    try {
      const response = await invoiceService.deleteInvoice(invoiceId);
      console.log(response);
      getData();
    } catch (error) {
      console.log(error.response);
      // navigate("error-response");
    }
  };

  const totalAmount = invoices?.reduce((sum, invoice) => {
    return sum + invoice.total;
  }, 0);

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
      <div className="flex flex-col gap-4 p-4 border border-default border-dashed rounded-base">
        <div className="grid grid-cols-3 gap-4 flex-1">
          <div className="flex flex-col gap-1 p-5 h-24 col-span-3 rounded-base bg-neutral-secondary-soft border border-zinc-100">
            <div className="flex gap-1 items-center">
              <svg
                className="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
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
                  d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8"
                />
              </svg>
              <h2 className="text-xl font-semibold">Invoices</h2>
            </div>
            <p className="text-fg-disabled">
              Manage, browse and search all your invoices.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3">
          <section className=" dark:bg-gray-900 col-span-3">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-500">All invoices: </span>
                  <span className="dark:text-white">
                    {invoiceStats.totalInvoices}
                  </span>
                </h5>
                <h5>
                  <span className="text-gray-500">Total amount: </span>
                  <span className="dark:text-white">
                    ${invoiceStats.totalAmount}
                  </span>
                </h5>
              </div>
              <Link
                to="new"
                className="flex items-center cursor-pointer justify-center gap-1 place-self-end text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <Plus size={18} />
                Create Invoice
              </Link>
            </div>
            <div className="dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 bg-red-100">
                <div className="relative w-full md:w-1/2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={filterQuery.search}
                    onChange={handleChange}
                  />
                </div>
                <div className="bg-blue-100 w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <div>
                    <Datepicker
                      placeholder="mm/dd/yyyy"
                      value={filterQuery.issuedDate}
                      onChange={(date) => handleChangeDate(date, "issuedDate")}
                    />
                  </div>
                  <div>
                    <Datepicker
                      placeholder="mm/dd/yyyy"
                      value={filterQuery.dueDate}
                      onChange={(date) => handleChangeDate(date, "dueDate")}
                    />
                  </div>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <Dropdown
                      label="Filter by status"
                      dismissOnClick={false}
                      renderTrigger={() => (
                        <button
                          type="button"
                          className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Filter by status
                        </button>
                      )}
                    >
                      <DropdownItem as="div">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            type="checkbox"
                            name="paid"
                            data-section="status"
                            checked={filterQuery.status.paid}
                            onChange={handleChange}
                          />
                          Paid
                        </label>
                      </DropdownItem>

                      <DropdownItem as="div">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            type="checkbox"
                            name="unpaid"
                            data-section="status"
                            checked={filterQuery.status.unpaid}
                            onChange={handleChange}
                          />
                          Unpaid
                        </label>
                      </DropdownItem>

                      <DropdownItem as="div">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            type="checkbox"
                            name="overdue"
                            data-section="status"
                            checked={filterQuery.status.overdue}
                            onChange={handleChange}
                          />
                          Overdue
                        </label>
                      </DropdownItem>

                      <DropdownItem as="div">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            type="checkbox"
                            name="pending"
                            data-section="status"
                            checked={filterQuery.status.pending}
                            onChange={handleChange}
                          />
                          Pending
                        </label>
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto min-h-80">
                <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-8 py-3 font-medium">
                        Client
                      </th>
                      <th scope="col" className="px-8 py-3 font-medium">
                        Reference
                      </th>
                      <th scope="col" className="px-8 py-3 font-medium">
                        Amount
                      </th>
                      <th scope="col" className="px-8 py-3 font-medium">
                        Status
                      </th>
                      <th scope="col" className="px-8 py-3 font-medium">
                        Due Date
                      </th>
                      <th scope="col" className="px-8 py-3 font-medium">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => {
                      return (
                        <InvoiceRow
                          key={invoice._id}
                          obj={invoice}
                          onDelete={handleDelete}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <nav className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                <span className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">0-50</span> of{" "}
                  <span className="font-semibold text-gray-900">50</span>
                </span>

                <Pagination
                  currentPage={1}
                  totalPages={50}
                  onPageChange={undefined}
                  showIcons
                />
              </nav>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
