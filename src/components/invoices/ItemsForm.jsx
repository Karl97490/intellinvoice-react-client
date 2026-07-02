import { Plus } from "lucide-react";
import itemService from "../../services/item.services";
import ItemsRow from "./ItemsRow";
import { useEffect, useState } from "react";

const ItemsForm = ({ items, setItems, handleChange, addItem, deleteItem }) => {
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const response = await itemService.getAllItems();
  //     console.log(response);
  //     setItems(reponse.data);
  //   } catch (error) {
  //     console.log(error.response);
  //     // navigate("/error-page");
  //   }
  // };

  // const addItem = () => {
  //   console.log("adding new item");
  // };

  return (
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
                className="flex cursor-pointer items-center max-h-15 justify-center gap-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-xl text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                type="button"
                onClick={addItem}
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
            {items.map((item, id) => {
              return (
                <ItemsRow
                  key={id}
                  obj={item}
                  id={id}
                  handleChange={handleChange}
                  deleteItem={deleteItem}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemsForm;
