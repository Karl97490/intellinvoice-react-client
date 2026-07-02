import StatusBadge from "./StatusBadge";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom";

const InvoiceRow = ({ obj: invoice, onDelete }) => {
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-blue-500">
      <th
        scope="row"
        className="px-8 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {invoice.client.name}
      </th>

      <td className="px-8 py-3">#INV-{invoice.invoiceNumber}</td>
      <td className="px-8 py-3 font-body">${invoice.total ?? 0}</td>
      <td className="px-8 py-3">
        <StatusBadge status={invoice.status} />
        {/* <span className="inline-block w-17 text-center bg-success-soft border border-success-subtle text-fg-success text-xs font-medium px-2 py-1 rounded-full">
          {invoice.status}
        </span> */}
      </td>
      <td className="px-8 py-3">
        {new Date(invoice.issuedDate).toLocaleDateString("en-US")}
      </td>
      <td className="px-3 py-3 text-center">
        <Dropdown
          label=""
          dismissOnClick={true}
          renderTrigger={() => (
            <button className="cursor-pointer inline-flex items-center p-0.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          )}
        >
          <DropdownItem>
            <Link to={`details/${invoice._id}`}>Show</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to={`edit/${invoice._id}`}>Edit</Link>
          </DropdownItem>
          <DropdownItem>Download</DropdownItem>

          <DropdownDivider />

          <DropdownItem onClick={() => onDelete(invoice._id)}>
            Delete
          </DropdownItem>
        </Dropdown>
        {/* <button
          id={`${invoice.invoiceNumber}-dropdown-button`}
          data-dropdown-toggle={`${invoice.invoiceNumber}-dropdown`}
          className="inline-flex items-center p-0.5 cursor-pointer text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        <div
          id={`${invoice.invoiceNumber}-dropdown`}
          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="text-left py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby={`${invoice.invoiceNumber}-dropdown-button`}
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Show
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Download
              </a>
            </li>
          </ul>
          <div className="py-1 text-left">
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Delete
            </a>
          </div>
        </div> */}
      </td>
    </tr>
  );
};

export default InvoiceRow;
