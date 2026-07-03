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
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { invoiceId } = useParams();
  const componentRef = useRef();

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

  const handlePrintOrDownload = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `invoice-${invoice?.invoiceNumber}`,
    pageStyle: `
    @media print {
      body { margin: 0; }
      div { page-break-inside: avoid; }
    }`,
  });

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
          <div className="flex justify-between items-end p-5 h-24 col-span-3 rounded-base bg-neutral-secondary-soft border border-zinc-100">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Invoice Details</h2>
              <span className="block text-gray-500 text-2xl font-semibold">
                #INV-{invoice.invoiceNumber}
              </span>
            </div>
            <div className="flex gap-1">
              <Button as={Link} to={`/invoices/edit/${invoice._id}`}>
                Edit
              </Button>
              <Button onClick={handlePrintOrDownload}>Print or Download</Button>
            </div>
          </div>
        </div>
        <section
          ref={componentRef}
          className="grid grid-cols-1 place-content-center gap-x-5 bg-white rounded-base"
        >
          <Card className="shadow-none border-0">
            {/* Header with Logo/Company Info */}
            <div className="flex items-start justify-between border-b-2 border-gray-200 pb-8 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">INVOICE</h1>
                <p className="mt-2 text-sm text-gray-500 font-medium">
                  Invoice #INV-{invoice.invoiceNumber}
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-gray-900">
                  {invoice.owner.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {invoice.owner.email}
                </p>
                <p className="text-sm text-gray-600">{invoice.owner.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-200">
              <div className=" p-6 rounded-lg">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4">
                  Bill From
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">
                    {invoice.owner.name}
                  </p>
                  <p className="text-gray-600">{invoice.owner.address}</p>
                  <p className="text-gray-600">{invoice.owner.email}</p>
                  <p className="text-gray-600">{invoice.owner.phone}</p>
                </div>
              </div>

              <div className=" p-6 rounded-lg">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4">
                  Bill To
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">
                    {invoice.client.name}
                  </p>
                  <p className="text-gray-600">{invoice.client.address}</p>
                  <p className="text-gray-600">{invoice.client.email}</p>
                  <p className="text-gray-600">{invoice.client.phone}</p>
                </div>
              </div>

              <div className="border border-gray-100 p-6 rounded-lg">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4">
                  Invoice Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invoice Number:</span>
                    <span className="font-semibold text-gray-900">
                      INV-{invoice.invoiceNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issued Date:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(invoice.issuedDate).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(invoice.dueDate).toLocaleDateString("en-US")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Table>
                <TableHead className="bg-gray-100">
                  <TableHeadCell className="bg-gray-100 font-semibold text-gray-900">
                    Item Description
                  </TableHeadCell>
                  <TableHeadCell className="bg-gray-100 font-semibold text-gray-900 text-center">
                    Quantity
                  </TableHeadCell>
                  <TableHeadCell className="bg-gray-100 font-semibold text-gray-900 text-right">
                    Unit Price
                  </TableHeadCell>
                  <TableHeadCell className="bg-gray-100 font-semibold text-gray-900 text-center">
                    Tax
                  </TableHeadCell>
                  <TableHeadCell className="bg-gray-100 font-semibold text-gray-900 text-right">
                    Total
                  </TableHeadCell>
                </TableHead>

                <TableBody className="divide-y divide-gray-200">
                  {invoice?.items.map((item, index) => (
                    <TableRow key={index} className="hover:">
                      <TableCell className="font-medium text-gray-900">
                        {item.title}
                      </TableCell>
                      <TableCell className="text-center text-gray-700">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right text-gray-700">
                        ${item.unitPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center text-gray-700">
                        {item.tax}%
                      </TableCell>
                      <TableCell className="text-right font-semibold text-gray-900">
                        ${(item.quantity * item.unitPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-3">
                  Notes
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-[40rem]">
                  {invoice.notes}
                </p>
              </div>

              <div className="w-full md:w-80">
                <div className=" p-6 rounded-lg space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${invoice.subTotal || "0.00"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax ({invoice.tax}%)</span>
                    <span className="font-medium text-gray-900">
                      ${invoice.taxAmount || "0.00"}
                    </span>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-heading">
                      ${invoice.total || "0.00"}
                    </span>
                  </div>

                  <div className="pt-2 bg-gray-50 border border-gray-100 p-3 rounded text-center">
                    <p className="text-xs font-semibold text-heading">
                      Amount Due
                    </p>
                    <p className="text-xl font-bold text-heading">
                      ${invoice.total || "0.00"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 mt-8 pt-6 text-center">
              <p className="text-xs text-gray-500">
                © 2026 {invoice.owner.name}. All rights reserved.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                This invoice was generated on{" "}
                {new Date().toLocaleDateString("en-US")}
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default InvoiceDetails;
