"use client";

import { UserAuthData } from "../hooks/useAuth";
import { getFromLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfilePicture() {
  const storedAuthData = getFromLocalStorage<UserAuthData>("user");

  const [image, setImage] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${storedAuthData?.token}`,
      responseType: "arraybuffer",
    },
  };

  useEffect(() => {
    if (storedAuthData?.profile_picture) {
      axios
        .get(
          `http://localhost:8000/auth/pic/${storedAuthData.profile_picture}`,
          config
        )
        .then((response) => {
          console.log(response.data);
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          const src = URL.createObjectURL(blob);
          setImage(src);
        })
        .catch((err) => {
          console.error("Error catching image", err);
        });
    }
    return () => {};
  }, [storedAuthData?.profile_picture]);

  return <img src={image} alt="Profile Pic" />;
}
