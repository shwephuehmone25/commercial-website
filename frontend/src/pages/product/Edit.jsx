import React, { Suspense } from "react";

const ProductForm = React.lazy(() => import("../../components/ProductForm"));

const Edit = () => {
  return (
    <section className="px-10 mt-10">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductForm isCreate={false} />
      </Suspense>
    </section>
  );
};

export default Edit;
