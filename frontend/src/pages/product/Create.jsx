import React, { Suspense } from "react";

const ProductForm = React.lazy(() => import("../../components/ProductForm"));

const Create = () => {
  return (
    <section className="px-10 mt-10">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductForm isCreate={true} />
      </Suspense>
    </section>
  );
};

export default Create;
