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

const InvoiceDetails = () => {
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
                  Invoice #INV-2026-001
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
                  <p className="font-semibold text-gray-900">My Company</p>
                  <p>contact@mycompany.com</p>
                  <p>+33 6 12 34 56 78</p>
                  <p>10 Business Street</p>
                  <p>75001 Paris, France</p>
                </div>
              </div>

              {/* Bill To */}
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Bill To
                </h3>

                <div className="space-y-1 text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p>john@email.com</p>
                  <p>+33 6 98 76 54 32</p>
                  <p>25 Client Avenue</p>
                  <p>69000 Lyon, France</p>
                </div>
              </div>

              {/* Invoice Info */}
              <div className="md:text-right">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Invoice Number</p>
                    <p className="font-semibold text-gray-900">INV-2026-001</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Issued Date</p>
                    <p className="font-medium">02 Jul 2026</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Due Date</p>
                    <p className="font-medium">16 Jul 2026</p>
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
                  <TableRow>
                    <TableCell>Website Design</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>€500.00</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell className="text-right">€1,200.00</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Hosting</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>€120.00</TableCell>
                    <TableCell>20%</TableCell>
                    <TableCell className="text-right">€144.00</TableCell>
                  </TableRow>
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
