import { Trash2 } from "lucide-react";
import { PencilLine } from "lucide-react";

const ItemsRow = ({ obj: item, id: itemId, handleChange, deleteItem }) => {
  return (
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
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Title"
          data-section="items"
          value={item.title}
          onChange={(e) => handleChange("title", e.target.value, itemId)}
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
            className="border-x-0 h-10 placeholder:text-heading text-center w-full bg-neutral-secondary-medium border-gray-300 py-2.5 placeholder:text-body"
            type="text"
            id="quantity-input"
            data-input-counter
            aria-describedby="helper-text-explanation"
            placeholder="0"
            value={item.quantity}
            onChange={(e) => handleChange("quantity", e.target.value, itemId)}
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
          placeholder="Price"
          value={item.unitPrice}
          onChange={(e) => handleChange("unitPrice", e.target.value, itemId)}
          // required={true}
        />
      </td>
      <td className="px-6 py-4">
        <input
          className="max-w-[6rem] bg-gray-50 border border-gray-300 text-gray-900 mt-1 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="number"
          placeholder="0%"
          value={item.tax}
          onChange={(e) => handleChange("tax", e.target.value, itemId)}
          // required={true}
        />
      </td>
      <td className="px-8 py-4">
        <span className="text-heading text-base font-body">$19963</span>
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
            onClick={deleteItem}
            className="font-medium text-red-500 cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemsRow;
