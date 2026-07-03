import { NavLink, Link, useNavigate } from "react-router-dom";
import { Eye, Plus, Trash2, PencilLine } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import authService from "../../services/auth.service";
import invoiceService from "../../services/invoice.service";
import { AuthContext } from "../../context/auth.context";
import { Datepicker, Button, TextInput, Textarea } from "flowbite-react";
import ItemsForm from "../../components/invoices/ItemsForm";
import itemService from "../../services/item.services";

const CreateInvoice = () => {
  // const { user } = useContext(AuthContext); // use user?._id instead of userId
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      title: "",
      quantity: 0,
      tax: 2.5,
      unitPrice: 0,
      total: 0,
    },
  ]);
  const [invoiceForm, setInvoiceForm] = useState({
    invoiceNumber: "",
    status: "unpaid", // need to update this
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
    items,
    issuedDate: new Date(),
    dueDate: new Date(),
    subTotal: 0,
    tax: 2.5,
    taxAmount: 0,
    total: 0,
    notes: "",
  });

  useEffect(() => {
    calculateInvoiceTotals();
  }, [items]);

  const calculateInvoiceTotals = () => {
    let subtotal = 0;
    let totalTaxAmount = 0;

    items.forEach((item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      const taxRate = parseFloat(item.tax) || 0;

      const itemSubtotal = quantity * unitPrice;
      const itemTaxAmount = itemSubtotal * (taxRate / 100);

      subtotal += itemSubtotal;
      totalTaxAmount += itemTaxAmount;
    });

    const total = subtotal + totalTaxAmount;
    setInvoiceForm((prev) => ({
      ...prev,
      subTotal: parseFloat(subtotal.toFixed(2)),
      taxAmount: parseFloat(totalTaxAmount.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
    }));
  };

  const handleChangeItem = (name, value, itemId) => {
    console.log(name, value);

    // Si on change la tax, mettre à jour tous les items ET invoiceForm
    if (name === "tax") {
      const taxValue = parseFloat(value) || 0;
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          tax: taxValue,
        })),
      );
      setInvoiceForm((prev) => ({
        ...prev,
        tax: taxValue,
      }));
      return;
    }

    // Pour les autres champs, juste mettre à jour cet item
    setItems((prev) => {
      const updatedItems = [...prev];
      updatedItems[itemId] = {
        ...updatedItems[itemId],
        [name]: value,
      };
      return updatedItems;
    });
  };

  const handleChangeTax = (value) => {
    setInvoiceForm((prev) => ({
      ...prev,
      tax: parseFloat(value) || 0,
    }));

    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        tax: parseFloat(value) || 0,
      })),
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        title: "",
        quantity: 0,
        tax: invoiceForm.tax,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const deleteItem = (itemId) => {
    setItems((prev) => {
      const updatedItems = prev.toSpliced(itemId, 1);
      return updatedItems;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const section = e.target.dataset.section;
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

  const handleChangeDate = (date, field) => {
    setInvoiceForm((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("creating...");
    e.preventDefault();
    setIsCreating(true);
    const body = {
      ...invoiceForm,
      issuedDate: invoiceForm?.issuedDate.toISOString(),
      dueDate: invoiceForm?.dueDate.toISOString(),
      items,
    };
    console.log(body);
    try {
      const response = await invoiceService.createInvoice(body);
      console.log(response);
      setIsCreating(false);
      // toast success
      navigate(`/invoices/details/${response.data.invoiceId}`);
    } catch (error) {
      console.log(error.response);
      // error message - toast error
      setIsCreating(false);
    }
  };

  if (isCreating || isLoading) {
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
              <Button type="submit" className="flex gap-1">
                Save Invoice
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-5 border border-zinc-200 rounded-base flex-1">
            <div>
              <label className="block text-base font-medium text-gray-900 w-full">
                Invoice Number
              </label>
              <TextInput
                id="invoice-number"
                type="number"
                name="invoiceNumber"
                placeholder="INV-1001"
                value={invoiceForm.invoiceNumber}
                onChange={handleChange}
                min={0}
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-900 w-full">
                Issue date
              </label>
              <Datepicker
                value={invoiceForm.issuedDate}
                onChange={(date) => handleChangeDate(date, "issuedDate")}
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-900 w-full">
                Due date
              </label>
              <Datepicker
                value={invoiceForm.dueDate}
                onChange={(date) => handleChangeDate(date, "dueDate")}
              />
            </div>
          </div>
          <div className="grid grid-cols-[1fr] xl:grid-cols-2 gap-4 flex-1">
            <div className="space-y-2 md:space-y-4 p-6 sm:p-8 bg-white border border-zinc-200 rounded-base">
              <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Bill From
              </h1>
              <TextInput
                id="owner-name"
                type="text"
                name="name"
                label="Name"
                placeholder="Company Name"
                data-section="owner"
                value={invoiceForm.owner.name}
                onChange={handleChange}
                required
              />
              <TextInput
                id="owner-email"
                type="email"
                name="email"
                label="Email"
                placeholder="name@company.com"
                data-section="owner"
                value={invoiceForm.owner.email}
                onChange={handleChange}
              />
              <Textarea
                id="owner-address"
                name="address"
                label="Address"
                placeholder="3 road John Doe"
                data-section="owner"
                rows={3}
                value={invoiceForm.owner.address}
                onChange={handleChange}
                required
              />
              <TextInput
                id="owner-phone"
                type="tel"
                name="phone"
                label="Phone"
                placeholder="22-56-59-74"
                data-section="owner"
                value={invoiceForm.owner.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:space-y-4 p-6 sm:p-8 bg-white border border-zinc-200 rounded-base">
              <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Bill To
              </h1>
              <TextInput
                id="client-name"
                type="text"
                name="name"
                label="Name"
                placeholder="Company Name"
                data-section="client"
                value={invoiceForm.client.name}
                onChange={handleChange}
                required
              />
              <TextInput
                id="client-email"
                type="email"
                name="email"
                label="Email"
                placeholder="name@company.com"
                data-section="client"
                value={invoiceForm.client.email}
                onChange={handleChange}
              />
              <Textarea
                id="client-address"
                name="address"
                label="Address"
                placeholder="3 road John Doe"
                data-section="client"
                rows={3}
                value={invoiceForm.client.address}
                onChange={handleChange}
                required
              />
              <TextInput
                id="client-phone"
                type="tel"
                name="phone"
                label="Phone"
                placeholder="22-56-59-74"
                data-section="client"
                value={invoiceForm.client.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <ItemsForm
              setItems={setItems}
              items={items}
              handleChange={handleChangeItem}
              addItem={addItem}
              deleteItem={deleteItem}
            />
          </div>
          <div className="grid grid-cols-2 gap-6 ">
            <div className="bg-white border border-zinc-200 rounded-base shadow-xs p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notes
              </h3>
              <Textarea
                className="resize-none"
                id="notes"
                name="notes"
                placeholder="Add any additional notes, payment terms, or special instructions here..."
                rows={8}
                value={invoiceForm.notes}
                onChange={handleChange}
              />
            </div>

            <div className="bg-white border border-zinc-200 rounded-base shadow-xs p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Invoice Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-gray-900 font-semibold">
                    ${invoiceForm.subTotal?.toFixed(2) || "0.00"}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Tax Amount</span>
                  <span className="text-gray-900 font-semibold">
                    ${invoiceForm.taxAmount?.toFixed(2) || "0.00"}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4 bg-gray-50 p-4 rounded-lg">
                  <span className="text-lg font-bold text-gray-900">
                    Total Amount Due
                  </span>
                  <span className="text-2xl font-bold text-heading">
                    ${invoiceForm.total?.toFixed(2) || "0.00"}
                  </span>
                </div>

                {/* <div className="pt-2">
                  <p className="text-xs text-gray-500">
                    All amounts are in USD
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
