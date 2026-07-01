const ClientRow = ({ obj: client }) => {
  return (
    <tr className="border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-blue-500">
      <th
        scope="row"
        className="px-8 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {client.name}
        <span className="block text-gray-600">##</span>
      </th>

      <td className="px-8 py-3">{client.email}</td>
      <td className="px-8 py-3 font-body">{client.phone}</td>
      <td className="px-8 py-3">{client.address}</td>
      <td className="px-8 py-3">NA</td>
      <td className="px-3 py-3 text-center">
        <button
          id={`${client.name}-dropdown-button`}
          data-dropdown-toggle={`${client.name}-dropdown`}
          className="inline-flex items-center cursor-pointer p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
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
          id={`${client.name}-dropdown`}
          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="text-left py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby={`${client.name}-dropdown-button`}
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
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
        </div>
      </td>
    </tr>
  );
};

export default ClientRow;
