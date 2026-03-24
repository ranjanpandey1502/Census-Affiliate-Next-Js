import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ResponsiveImage from "@/components/common/images/ResponsiveImage";
import TwoColumnImageGrid from "@/components/common/images/TwoColumnImageGrid";
import ThreeColumnImageGrid from "@/components/common/images/ThreeColumnImageGrid";
import ComponentCard from "../../../components/common/ComponentCard";

export default function ImagesPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Images" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsive image">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Image in 2 Grid">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </>
  );
}
