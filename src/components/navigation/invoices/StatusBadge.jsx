const StatusBadge = ({ status }) => {
  let color = "";
  if (status === "unpaid") {
    color = "danger";
  } else if (status === "paid") {
    color = "sucess";
  } else if (status === "overdue") {
    color = "warning";
  } else {
    color = "brand";
  }

  return (
    <span
      className={`inline-block w-17 capitalize text-center bg-${color}-soft border border-${color}-subtle text-fg-${color} text-xs font-medium px-2 py-1 rounded-full`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
