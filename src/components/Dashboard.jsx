import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../context";
import DashBalance from "./DashBalance";
import DashRequests from "./DashRequests";
import DashTransactions from "./DashTransactions";
import Profile from "./Profile";
import { getAllRequestsForPayer } from "../solidityMethods";
import axios from "axios";
const { REACT_APP_BACKEND } = process.env;

export default function Dashboard() {
  const id = useContext(userContext);
  const [requestList, setRequestList] = useState();

  const [profileData, setProfileData] = useState();
  console.log(id);

  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND}/getuserprofilebyid`, { id })
      .then((response) => {
        setProfileData(response.data.userProfile.name);
      });
  }, []);

  // useEffect(() => {
  //   // axios.post(`${REACT_APP_BACKEND}/getuserprofilebyid`,{id}).then((response)=>{
  //   //   const [first,second,third] = response.userProfile.requests
  //   //   setRequestList([first,second,third])
  //   // })
  //     getAllRequestsForPayer().then((response)=>{
  //       console.log('req res',response)
  //       const [first,second,third] = response
  //       setRequestList([first,second,third])
  //     })
  //   },[])

  return (
    <div className="flex-grow bg-primary text-white">
      <Profile />
      {/* <h1>Dashboard</h1>
      <h2>{`${id}`}</h2> */}
      <DashBalance />
      <DashRequests requests={requestList} />
      <DashTransactions />
    </div>
  );
}
