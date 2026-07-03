import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext, useState } from "react";
import { CircleUserRound, LogOut, AlertCircle } from "lucide-react";
import {
  Navbar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Button,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavbarLink,
  DropdownHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";

const Navigationbar = () => {
  const { authenticateUser, removeToken, isLoggedIn, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogOut = () => {
    setShowLogoutModal(false);
    removeToken();
    console.log("logout success.");
    authenticateUser();
    navigate("/login");
  };

  if (!isLoggedIn) {
    return (
      <Navbar fluid rounded className="fixed top-0 w-full z-20">
        <NavbarBrand as={NavLink} to="/">
          <span className="self-center whitespace-nowrap text-2xl font-bold text-blue-600">
            IntelliInvoice
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button as={NavLink} to="/login" className="mr-2">
            Get started
          </Button>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink as={NavLink} to="/" active>
            Home
          </NavbarLink>
          <NavbarLink as={NavLink} to="/about">
            About
          </NavbarLink>
          <NavbarLink as={NavLink} to="/services">
            Services
          </NavbarLink>
          <NavbarLink as={NavLink} to="/contact">
            Contact
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    );
  } else {
    return (
      <>
        <Navbar fluid rounded className="fixed top-0 w-full z-50">
          <NavbarBrand as="div">
            <span className="self-center whitespace-nowrap text-2xl font-bold text-blue-600">
              IntelliInvoice
            </span>
          </NavbarBrand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<CircleUserRound className="w-8 h-8 rounded-full" />}
            >
              <DropdownHeader>
                <span className="block text-sm font-medium">
                  {user?.name || "User"}
                </span>
                <span className="block truncate text-sm text-gray-500">
                  {user?.email || "user@example.com"}
                </span>
              </DropdownHeader>
              <DropdownItem as={NavLink} to="/dashboard">
                Dashboard
              </DropdownItem>
              <DropdownItem as={NavLink} to="/settings">
                Settings
              </DropdownItem>
              <DropdownItem as={NavLink} to="/earnings">
                Earnings
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem
                icon={LogOut}
                onClick={() => setShowLogoutModal(true)}
              >
                Sign out
              </DropdownItem>
            </Dropdown>
            <NavbarToggle />
          </div>
        </Navbar>

        <Modal show={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
          <ModalHeader>Confirm Sign Out</ModalHeader>
          <ModalBody>
            <div className="flex gap-4 items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-semibold">
                  Are you sure you want to sign out?
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  You will be redirected to the login page.
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button color="failure" onClick={handleConfirmLogOut}>
              Sign Out
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
};

export default Navigationbar;
