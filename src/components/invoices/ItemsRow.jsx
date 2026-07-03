import { Trash2, PencilLine, Minus, Plus } from "lucide-react";
import { TextInput, Button } from "flowbite-react";
import { useEffect } from "react";

const ItemsRow = ({ obj: item, id: itemId, handleChange, deleteItem }) => {
  const calculateTotal = () => {
    const quantity = parseFloat(item.quantity) || 0;
    const unitPrice = parseFloat(item.unitPrice) || 0;
    const taxRate = parseFloat(item.tax) || 0;

    const subtotal = quantity * unitPrice;
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;

    return total.toFixed(2);
  };

  useEffect(() => {
    const total = calculateTotal();
    handleChange("total", parseFloat(total), itemId);
  }, [item.quantity, item.unitPrice, item.tax]);

  return (
    <tr className="bg-neutral-primary-soft border-b border-default">
      <td className="p-4">
        <div className="flex items-center">
          <input
            id={`table-checkbox-${itemId}`}
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded-xs bg-gray-50 accent-primary-600 focus:ring-2 focus:ring-primary-500"
          />
          <label htmlFor={`table-checkbox-${itemId}`} className="sr-only">
            Row checkbox
          </label>
        </div>
      </td>
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <TextInput
          type="text"
          placeholder="Title"
          value={item.title}
          onChange={(e) => handleChange("title", e.target.value, itemId)}
        />
      </th>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Button
            size="xs"
            color="light"
            onClick={() =>
              handleChange(
                "quantity",
                Math.max(0, parseFloat(item.quantity) - 1),
                itemId,
              )
            }
            className="p-0 h-10 w-10"
          >
            <Minus size={16} />
          </Button>
          <TextInput
            type="number"
            placeholder="0"
            value={item.quantity}
            onChange={(e) => handleChange("quantity", e.target.value, itemId)}
            className="w-16 text-center"
          />
          <Button
            size="xs"
            color="light"
            onClick={() =>
              handleChange("quantity", parseFloat(item.quantity) + 1, itemId)
            }
            className="p-0 h-10 w-10"
          >
            <Plus size={16} />
          </Button>
        </div>
      </td>
      <td className="px-6 py-4">
        <TextInput
          type="number"
          placeholder="Price"
          value={item.unitPrice}
          onChange={(e) => handleChange("unitPrice", e.target.value, itemId)}
        />
      </td>
      <td className="px-6 py-4">
        <TextInput
          type="number"
          placeholder="0%"
          value={item.tax}
          onChange={(e) => handleChange("tax", e.target.value, itemId)}
          className="max-w-[6rem]"
        />
      </td>
      <td className="px-8 py-4 min-w-30 max-w-35">
        <span className="text-heading text-base font-body">
          ${calculateTotal()}
        </span>
      </td>
      <td className="px-4 pr-5 py-4">
        <div className="flex gap-x-6 justify-between">
          <Button
            color=""
            onClick={() => deleteItem(itemId)}
            className="p-0 w-auto text-red-500 cursor-pointer"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ItemsRow;
