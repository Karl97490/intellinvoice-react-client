import StatusBadge from "./StatusBadge";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

const InvoiceRow = ({ obj: invoice, onDelete, onStatusChange }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(invoice._id);
  };

  return (
    <>
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
          <StatusBadge
            status={invoice.status}
            invoiceId={invoice._id}
            onStatusChange={onStatusChange}
          />
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
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
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

            <DropdownItem onClick={handleDeleteClick}>Delete</DropdownItem>
          </Dropdown>
        </td>
      </tr>

      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          <div className="flex gap-4 items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-200" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white font-semibold">
                Are you sure you want to delete this invoice?
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Invoice #{invoice.invoiceNumber} from {invoice.client.name} will
                be permanently deleted. This action cannot be undone.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="light" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="failure" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default InvoiceRow;
