import Button from "@/components/common/button/Button";
import { Modal } from "@/components/common/modal";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import useNotification from "@/providers/notification/useNotification";
import ApiService from "@/services/Api.service";
import type {
  AffiliateLinkErrorType,
  AffiliateLinkFormValues,
} from "@/types/schema-validaiton.types";
import { AffiliateLinkSchema } from "@/utils/schema/AffiliateSchema";
import { useState, type ChangeEvent, type MouseEvent } from "react";

type CreateAffiliateLinkModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  handleSave: () => void;
};
const InitialValue = {
  affiliate_slug: "",
  affiliateDescription: "",
};
export default function CreateAffiliateLinkModal({
  isOpen,
  closeModal,
  handleSave,
}: CreateAffiliateLinkModalProps) {
  const [values, setValues] = useState<AffiliateLinkFormValues>(InitialValue);
  const [errors, setErrors] = useState<AffiliateLinkErrorType>({});
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  async function onSubmit(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const results = AffiliateLinkSchema.safeParse(values);
    if (!results.success) {
      const fieldErrors: AffiliateLinkErrorType = {};
      results.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof AffiliateLinkFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      setIsLoading(true);
      await ApiService.createAffiliateLink(
        values.affiliate_slug,
        values.description,
      );
      showNotification({
        notificationType: "success",
        title: "Affiliate Link created",
      });
      handleSave();
    } catch (error) {
      console.trace(error);
      showNotification({
        notificationType: "error",
        title: "Error Creating Affiliate Link",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined })); // clear error on change
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Create Affiliate Link
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Create new link to track users.
          </p>
        </div>
        <form className="flex flex-col">
          <div>
            <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>
                      Link Slug
                      <span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="affiliate_slug"
                      value={values.affiliate_slug}
                      onChange={handleChange}
                      placeholder="Unique Token to track your requests"
                    />
                    {errors.affiliate_slug && (
                      <p className="text-red-600 text-[12px] mt-1">
                        {errors.affiliate_slug}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Description</Label>
                    <Input
                      type="text"
                      value={values.description || ""}
                      name="description"
                      onChange={handleChange}
                      placeholder="Link Description"
                    />
                    {errors.description && (
                      <p className="text-red-600 text-[12px] mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={closeModal}
              disabled={isLoading}
            >
              Close
            </Button>
            <Button size="sm" onClick={onSubmit}>
              {isLoading ? <Spinner /> : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
