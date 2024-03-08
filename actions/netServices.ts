"use server";

import { currentUser } from "@/lib/auth";

export const errorHandling = (error: any) => {
  console.log(error);
  return {
    error: "Something went wrong!, please try again!",
    details: process.env.NODE_ENV !== "production" ? JSON.stringify(error) : "",
  };
};

export const getIdentityTypes = async (): Promise<any | null> => {
  try {
    const url = `${process.env.DONET_API_URL}/ApiXCore/Persons/GetTipoIdentificacionList?estaActiva=1&paraPersonaNatural=1`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return errorHandling(error);
  }
};

export const getCedula = async (cedula: string): Promise<any | null> => {
  try {
    console.log("cedula", cedula);
    const user = await currentUser();

    if (!user) {
      return { error: "Unauthorized" };
    }
    if (!cedula) {
      return { error: "Cedula is required" };
    }
    const response = await fetch(
      `${process.env.DONET_API_URL}/ApiXCore/Persons/GetPersonByID?id=${cedula}`
    );
    return await response.json();
  } catch (error) {
    return errorHandling(error);
  }
};
