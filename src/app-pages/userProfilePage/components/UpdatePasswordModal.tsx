import { EyeCloseIcon, EyeIcon } from "@/assets/icons";
import Button from "@/components/common/button/Button";
import { Modal } from "@/components/common/modal";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import useNotification from "@/providers/notification/useNotification";
import { useState } from "react";

export default function UpdatePasswordModal({
  isOpen,
  closeModal,
  handleSave,
}: {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: (
    current_password: string,
    new_password: string,
    confirm_password: string,
  ) => void;
}) {
  const [current_password, setCurrentPassword] = useState("");
  const [show_current_password, setShowCurrentPassword] = useState(false);
  const [new_password, setNewPassword] = useState("");
  const [show_new_password, setShowNewPassword] = useState(false);
  const [confirm_password, setConfirmPassword] = useState("");
  const [show_confirm_password, setShowConfirmPassword] = useState(false);
  const {showNotification} = useNotification();
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Update Password
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Update your Password to stay safe.
          </p>
        </div>
        <form className="flex flex-col">
          <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
            <div>
              <div className="grid gap-x-6 gap-y-5 grid-cols-1">
                <div>
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Input
                      value={current_password}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                      type={show_current_password ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <span
                      onClick={() => setShowCurrentPassword(!show_current_password)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {show_current_password ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Label>New Password</Label>
                  <div className="relative">
                    <Input
                      value={new_password}
                      onChange={(event) => setNewPassword(event.target.value)}
                      type={show_new_password ? "text" : "password"}
                      placeholder="Enter new password"
                    />
                    <span
                      onClick={() => setShowNewPassword(!show_new_password)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {show_new_password? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Label>Confirm Password</Label>
                  <div className="relative">
                    <Input
                      value={confirm_password}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      type={show_confirm_password ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!confirm_password)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {show_confirm_password ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal} >
              Close
            </Button>
            <Button size="sm" onClick={async (event) => {
                try {
                    event.preventDefault();
                    await handleSave(current_password, new_password, confirm_password)
                    showNotification({
                        notificationType: 'success',
                        title: 'Password Updated'
                    })
                } catch (error) {
                    console.trace(error);
                    showNotification({
                        notificationType: 'error',
                        title: 'Error updating password'
                    })
                }
            }}>
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
