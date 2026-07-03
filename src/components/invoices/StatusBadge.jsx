import { Dropdown, DropdownItem } from "flowbite-react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const StatusBadge = ({ status, invoiceId, onStatusChange }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  let color = "";
  if (currentStatus === "unpaid") {
    color = "danger";
  } else if (currentStatus === "paid") {
    color = "success";
  } else if (currentStatus === "overdue") {
    color = "warning";
  } else if (currentStatus === "pending") {
    color = "info";
  } else {
    color = "brand";
  }

  const statusOptions = ["unpaid", "paid", "overdue", "pending"];

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(invoiceId, newStatus);
    }
  };

  return (
    <Dropdown
      label=""
      dismissOnClick={true}
      renderTrigger={() => (
        <button
          type="button"
          className={`inline-flex items-center gap-1 capitalize text-center bg-${color}-soft border border-${color}-subtle text-fg-${color} text-xs font-medium px-2.5 py-1.5 rounded-full hover:opacity-80 transition-opacity`}
        >
          {currentStatus}
          <ChevronDown size={14} />
        </button>
      )}
    >
      {statusOptions.map((statusOption) => (
        <DropdownItem
          key={statusOption}
          onClick={() => handleStatusChange(statusOption)}
          className={currentStatus === statusOption ? "font-bold" : ""}
        >
          <span className="capitalize">{statusOption}</span>
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default StatusBadge;
