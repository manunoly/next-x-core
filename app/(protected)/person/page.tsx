"use client";

import { use, useEffect, useRef, useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getCedula, getIdentityTypes } from "@/actions/netServices";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

const PeronsPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const inputRef = useRef<HTMLInputElement>(null);


  const searhByCedula = async () => {
    startTransition(async () => {
      try {
        setError("");
        setSuccess("");
        if (inputRef.current && inputRef.current.value) {
          const data = await getCedula(inputRef.current.value);
          console.log("data From", data);
          if (data?.error) {
            setError(data.error || "Something went wrong!");
          }
          if (data?.success) {
            setSuccess(JSON.stringify(data.data));
          }
        }
      } catch (error) {
        setError(error?.message || "Something went wrong!");
      }
    });
  }

  const identityTypes = () => {
    getIdentityTypes().then((data) => {
      console.log("data", data);
    });
  }

  useEffect(() => {
    identityTypes();
  }, []);

  return (
    <>

      <Card>
        <CardHeader>
          <p className="text-2xl font-semibold text-center">
            ⚙️ Buscar Persona
          </p>
        </CardHeader>
        <CardContent>
          <input
            type="text"
            id="cedula"
            name="cedula"
            placeholder="Cedula"
            className="w-full p-2 my-2 border border-gray-300 rounded"
            ref={inputRef}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <button
            type="submit"
            disabled={isPending}
            className="w-full p-2 my-2 text-white bg-blue-500 rounded"
            onClick={searhByCedula}
          >
            Buscar
          </button>
        </CardContent>
      </Card >
    </>
  );
}

export default PeronsPage;