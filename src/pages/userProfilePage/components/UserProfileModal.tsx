import { useState } from "react";
//
import Button from "@/components/common/button/Button";
import { Modal } from "@/components/common/modal";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import useAuth from "@/providers/auth/useAuth";
import useNotification from "@/providers/notification/useNotification";

export default function UserProfileModal({
  isOpen,
  closeModal,
  handleSave,
}: {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: (
    first_name: string,
    last_name: string,
    phone_no?: string,
  ) => void;
}) {
  const { userInfo } = useAuth();
  const [first_name, setFirstName] = useState(userInfo?.first_name);
  const [last_name, setLastName] = useState(userInfo?.last_name);
  const [phone_no, setPhoneNo] = useState(userInfo?.phone_no);
  const { showNotification } = useNotification();
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Personal Information
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your details to keep your profile up-to-date.
          </p>
        </div>
        <form className="flex flex-col">
          <div className="custom-scrollbar h-[350px] overflow-y-auto px-2 pb-3">
            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Personal Information
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    value={first_name}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    value={last_name}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Email Address</Label>
                  <Input type="text" value={userInfo?.email} disabled />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    value={phone_no}
                    onChange={(event) => setPhoneNo(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={async (event) => {
                event.preventDefault();
                try {
                  if (!first_name || !last_name) return;
                  await handleSave(first_name, last_name, phone_no);
                  showNotification({
                    notificationType: "success",
                    title: "Profile Updated",
                  });
                } catch (error) {
                  console.trace(error);
                  showNotification({
                    notificationType: "error",
                    title: "Error Saving Profile",
                  });
                }
              }}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
