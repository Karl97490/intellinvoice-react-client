import StatusBadge from "./StatusBadge";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const RecentInvoiceRow = ({ obj: invoice }) => {
  return (
    <tr className="bg-neutral-primary-soft border-b border-default">
      <th
        scope="row"
        className="px-8 py-4 font-medium text-heading whitespace-nowrap"
      >
        {invoice.client.name}
        <span className="block text-gray-600">
          #INV-{invoice.invoiceNumber}
        </span>
      </th>

      <td className="px-8 py-3">00001</td>
      <td className="px-8 py-3 font-body">${invoice.total ?? 0}</td>
      <td className="px-8 py-3">
        <StatusBadge status={invoice.status} />
      </td>
      <td className="px-8 py-3">
        {new Date(invoice.issuedDate).toLocaleDateString("en-US")}
      </td>
      <td className="px-3 py-4 text-left">
        <Link
          to={`/invoices/details/${invoice._id}`}
          className="font-medium text-fg-brand hover:underline"
        >
          <Eye size={20} />
        </Link>
      </td>
    </tr>
  );
};

export default RecentInvoiceRow;
