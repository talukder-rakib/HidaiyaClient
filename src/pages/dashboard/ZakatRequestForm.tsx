import React from "react";
import AppForm from "./../../components/form/AppForm";
import AppButton from "./../../components/form/ui/AppButton";
import AppFormInput from "./../../components/form/ui/AppFormInput";
import AppFormTextarea from "./../../components/form/ui/AppFormTextarea";
import { useNavigate } from "react-router-dom";

const ZakatRequestForm = () => {
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    // TODO: Send data to backend API
    alert("Zakat request submitted! (Demo)");
    navigate("/dashboard/zakatReciver");
  };

  return (
    <div className="w-full flex items-center justify-center py-10 px-2">
      <div className="rounded-xl bg-white shadow-md overflow-hidden p-6 sm:p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Zakat Request Form
        </h2>
        <AppForm onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AppFormInput name="fullName" label="Full Name" required />
            <AppFormInput name="email" label="Email" type="email" required />
            <AppFormInput name="phone" label="Phone Number" required />
            <AppFormInput name="amount" label="Requested Amount" type="number" required />
          </div>
          <AppFormTextarea name="reason" label="Reason for Request" required className="mt-4" />
          <AppButton type="submit" label="Submit Request" className="mt-6 w-full" />
        </AppForm>
      </div>
    </div>
  );
};

export default ZakatRequestForm;
