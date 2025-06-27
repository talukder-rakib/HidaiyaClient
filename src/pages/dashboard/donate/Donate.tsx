// src/features/auth/Donate.tsx
import AppForm from "../../../components/form/AppForm";
import AppButton from "../../../components/form/ui/AppButton";

import { useNavigate } from "react-router-dom";
import AppFormInput from "../../../components/form/ui/AppFormInput";
import AppFormTextarea from "../../../components/form/ui/AppFormTextarea";
import AppFormSelect from "../../../components/form/ui/AppformSelect";
import { useGetmeQuery } from "../../../redux/features/auth/authApi";
import { useState } from "react";

//import { useCreateDonorMutation } from "../../../redux/features/donor/Donate.api";

interface DonorFormData {
  name: string;
  gender: "male" | "female" | "other";
  email: string;
  password: string;
}

const medthodOption = [
  { value: "bKash", label: "bKash" },
  { value: "Nagad", label: "Nagad" },
  { value: "Rocket", label: "Rocket" },
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Cash", label: "Cash" },
  { value: "Other", label: "Other" },
];

const Donate = () => {
  const [loading, setLoading] = useState(false);
  const { data: getme } = useGetmeQuery("zakatDonor");
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Call your backend to create a payment session
      const response = await fetch(
        "https://your-backend.com/api/payment/initiate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: data.amount,
            date: data.date,
            method: data.method,
            message: data.message,
            donor: getme || {},
          }),
        }
      );
      const result = await response.json();
      if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else {
        alert("Failed to initiate payment.");
      }
    } catch (error: any) {
      alert("Payment error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center ">
      <div className="rounded-xl bg-[#1F2937] shadow-md overflow-hidden p-3 sm:p-8 max-w-md w-full">
        <h2 className="text-2xl text-red font-semibold mb-6 text-center">
          Donate Here
        </h2>
        <AppForm onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AppFormInput name="amount" label="Amount" type="number" required />
            <AppFormInput name="date" label="Date" required />
          </div>

          <AppFormSelect
            options={medthodOption}
            name="method"
            label="Method"
            required
          />
          <AppFormTextarea name="message" label="Message" />

          <AppButton
            type="submit"
            label={loading ? "Processing..." : "Donate Now"}
            className="mt-4 w-full"
            disabled={loading}
          />
        </AppForm>
      </div>
    </div>
  );
};

export default Donate;
