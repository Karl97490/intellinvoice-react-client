import {
  Button,
  Card,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import invoiceService from "../../services/invoice.service";
import { useParams } from "react-router-dom";

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { invoiceId } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await invoiceService.getInvoice(invoiceId);
      console.log(response);
      setInvoice(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      // navigate("error-page");
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
      <div className="flex flex-col gap-4 p-4 border border-default border-dashed rounded-base">
        <div className="grid grid-cols-3 gap-4 flex-1">
          <div className="flex justify-between items-end p-5 h-24 col-span-3 rounded-base bg-neutral-secondary-soft border border-zinc-100 bg-red-100">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Invoice Details</h2>
              <span className="block text-gray-500 text-2xl font-semibold">
                #INV-1235
              </span>
            </div>
            <div className="flex gap-1">
              <Button>Edit</Button>
              <Button>Print or Download</Button>
            </div>
          </div>
        </div>
        <section className="grid grid-cols-1 place-content-center gap-x-5 bg-white border border-zinc-200 rounded-base">
          <Card>
            {/* Header */}
            <div className="flex items-start justify-between border-b pb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Invoice #INV-{invoice.invoiceNumber}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Thank you for your business.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 border-b pb-8 md:grid-cols-3">
              {/* Bill From */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Bill From
                </h3>

                <div className="space-y-1 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">
                    {invoice.owner.name}
                  </p>
                  <p>{invoice.owner.email}</p>
                  <p>{invoice.owner.phone}</p>
                  <p>{invoice.owner.address}</p>
                </div>
              </div>

              {/* Bill To */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Bill To
                </h3>

                <div className="space-y-1 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">
                    {invoice.client.name}
                  </p>
                  <p>{invoice.client.email}</p>
                  <p>{invoice.client.phone}</p>
                  <p>{invoice.client.address}</p>
                </div>
              </div>

              {/* Invoice Info */}
              <div className="md:text-right">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Invoice Number</p>
                    <p className="font-semibold text-gray-900">
                      INV-{invoice.invoiceNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Issued Date</p>
                    <p className="font-medium">
                      {new Date(invoice.issuedDate).toLocaleDateString("en-US")}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Due Date</p>
                    <p className="font-medium">
                      {new Date(invoice.dueDate).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mt-8 overflow-x-auto">
              <Table>
                <TableHead>
                  <TableHeadCell>Item</TableHeadCell>
                  <TableHeadCell>Qty</TableHeadCell>
                  <TableHeadCell>Unit Price</TableHeadCell>
                  <TableHeadCell>Tax</TableHeadCell>
                  <TableHeadCell className="text-right">Total</TableHeadCell>
                </TableHead>

                <TableBody className="divide-y">
                  {invoice?.items.map((item) => {
                    return (
                      <TableRow>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.unitPrice}</TableCell>
                        <TableCell>{item.tax}%</TableCell>
                        <TableCell className="text-right">€1,200.00</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Totals */}
            <div className="mt-8 flex justify-end">
              <div className="w-full max-w-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>€1,120.00</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>€224.00</span>
                </div>

                <div className="flex justify-between border-t pt-3 text-lg font-bold">
                  <span>Total</span>
                  <span>€1,344.00</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-10 border-t pt-6">
              <h3 className="mb-2 font-semibold text-gray-900">Notes</h3>
              <p className="text-sm text-gray-600">
                Payment is due within 14 days. Thank you for your business.
                Please contact us if you have any questions regarding this
                invoice.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default InvoiceDetails;
