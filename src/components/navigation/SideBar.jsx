import { AuthContext } from "../../context/auth.context";
import { useContext, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { SquarePlus, LogOut, AlertCircle } from "lucide-react";
import {
  Sidebar,
  Badge,
  SidebarItems,
  SidebarItemGroup,
  SidebarItem,
  SidebarCollapse,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "flowbite-react";

const SideBar = () => {
  const { authenticateUser, removeToken, isLoggedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 640);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  // Ouvrir/fermer automatiquement selon la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleConfirmLogOut = () => {
    setShowLogoutModal(false);
    removeToken();
    authenticateUser();
    navigate("/login");
  };

  if (isLoggedIn) {
    return (
      <>
        <aside
          className={`fixed top-0 left-0 z-40 h-screen w-64 pt-15 bg-white border-r border-gray-200 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar
            aria-label="Sidebar"
            className="h-full bg-white [&>div]:bg-white [&>div]:h-full"
          >
            <div className="h-full flex flex-col justify-between py-4">
              <SidebarItems>
                <SidebarItemGroup>
                  <SidebarItem
                    as={NavLink}
                    to="/dashboard"
                    icon={() => (
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"
                        />
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"
                        />
                      </svg>
                    )}
                  >
                    Dashboard
                  </SidebarItem>

                  <SidebarCollapse
                    icon={() => (
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 13h3.439a.991.991 0 0 1 .908.6 3.978 3.978 0 0 0 7.306 0 .99.99 0 0 1 .908-.6H20M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6M4 13l2-9h12l2 9M9 7h6m-7 3h8"
                        />
                      </svg>
                    )}
                    label="Invoices"
                  >
                    <SidebarItem as={Link} to="/invoices" className="pl-10">
                      <div className="flex items-center justify-between w-full">
                        <span>List All</span>
                        <Badge color="failure">20</Badge>
                      </div>
                    </SidebarItem>
                    <SidebarItem
                      as={Link}
                      to="/invoices/new"
                      className="pl-10"
                      icon={() => <SquarePlus size={16} />}
                    >
                      Create Invoice
                    </SidebarItem>
                  </SidebarCollapse>

                  <SidebarCollapse
                    icon={() => (
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                        />
                      </svg>
                    )}
                    label="Clients"
                  >
                    <SidebarItem as={Link} to="/clients" className="pl-10">
                      <div className="flex items-center justify-between w-full">
                        <span>List All</span>
                        <Badge color="failure">4</Badge>
                      </div>
                    </SidebarItem>
                    <SidebarItem
                      as={Link}
                      to="/clients/new"
                      className="pl-10"
                      icon={() => <SquarePlus size={16} />}
                    >
                      Create Client
                    </SidebarItem>
                  </SidebarCollapse>

                  <SidebarItem
                    as={NavLink}
                    to="/profile"
                    icon={() => (
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                          d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  >
                    User
                  </SidebarItem>
                </SidebarItemGroup>
              </SidebarItems>

              <SidebarItems>
                <SidebarItemGroup>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full flex items-center px-4 py-2 text-red-400 rounded-base hover:bg-red-100 hover:text-red-500 transition"
                  >
                    <LogOut size={18} />
                    <span className="ms-3">Sign Out</span>
                  </button>
                </SidebarItemGroup>
              </SidebarItems>
            </div>
          </Sidebar>
        </aside>

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

export default SideBar;
