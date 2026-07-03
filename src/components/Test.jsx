import { Dropdown } from "flowbite-react";
const Test = () => {
  return (
    <div className="bg-red-100 flex justify-center">
      <Dropdown label="Test">
        <Dropdown.Item>Item 1</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Test;
