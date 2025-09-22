import Modal from "../components/common/Modal";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [token] = useAuthContext();

  const isAuthenticated = token !== null && token !== undefined;

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  if (!isAuthenticated) {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigate(-1);
        }}
        icon={<IoWarningOutline size={40} className="text-yellow-500" />}
        heading="Access Denied"
        text="You must be logged in to access this page."
        primaryButtonText="Go to Login"
        onPrimaryClick={() => {
          navigate("/sign-in");
        }}
        secondaryButtonText="Go Back"
        onSecondaryClick={() => {
          navigate(-1);
        }}
      />
    );
  }
  return children;
}

export default ProtectedRoute;
