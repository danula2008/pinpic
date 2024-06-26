import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonaryLayout from "./MasonaryLayout";
import Spinner from "./Spinner";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology,programing,tech";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activebtn, setActivebtn] = useState("created");

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();

    navigate("/login");
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="Banner"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user.image}
              alt="User Image"
            />
            <h1 className="font-bol₫ text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-red-700 p-2 rounded-2xl cursor-pointer outline-none shadow-md"
                      style={{ color: "white" }}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout
                        color="white"
                        fontSize={30}
                        className="ml-2"
                      />
                      Logout
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
          </div>

          <div className="text-center mb-7 mt-3">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActivebtn("created");
              }}
              className={`${
                activebtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActivebtn("saved");
              }}
              className={`${
                activebtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>

          {pins?.length ? (
            <div className="px-2">
              <MasonaryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              {" "}
              No pins found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
