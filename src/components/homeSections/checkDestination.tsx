// "use client";
// import React, { ReactEventHandler, useEffect, useState } from "react";
// import bg_image from "../../assets/offer-3.jpg";
// import { fetcher } from "@/helpers/apiHelper";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import useSWR from "swr";
// import DestinationHeadLine from "./destinationHeadLine";

// import { v4 as uuidv4 } from "uuid";
// import { Span } from "next/dist/trace";
// uuidv4();

// interface countryProps {
//   country_name: string;
// }

// interface SearchValueProps {
//   cityName: string;
//   CountryName: string;
//   stateName: string;
//   checkInDate: string;
//   checkOutDate: string;
// }

// const CheckDestination = () => {
//   // const tokenGen: tokenProps
//   const [tokenGen, setTokenGen] = useState<string | undefined>(undefined);

//   const [searchValue, setSearchValue] = useState<SearchValueProps>({
//     cityName: "",
//     CountryName: "",
//     stateName: "",
//     checkInDate: "",
//     checkOutDate: "",
//   });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//   };

//   const { data, error, isLoading } = useSWR(
//     "https://www.universal-tutorial.com/api/countries",
//     fetcher,
//     {
//       revalidateIfStale: false,
//       revalidateOnFocus: false,
//       revalidateOnReconnect: false,
//     }
//   );
//   if (error) {
//     console.log(error, "get country");
//   }

//   const {
//     data: item,
//     error: errorItem,
//     isLoading: isLoadingCheck,
//   } = useSWR(
//     !searchValue.CountryName
//       ? null
//       : `https://www.universal-tutorial.com/api/states/` +
//           `${searchValue.CountryName}`,
//     fetcher,
//     {
//       revalidateIfStale: false,
//       revalidateOnFocus: false,
//       revalidateOnReconnect: false,
//     }
//   );
//   if (errorItem) {
//     console.log(errorItem, "get state");
//   }

//   const {
//     data: item1,
//     error: errorItem1,
//     isLoading: isLoadingCheck1,
//   } = useSWR(
//     !searchValue.stateName
//       ? null
//       : `https://www.universal-tutorial.com/api/cities/` +
//           `${searchValue.stateName}`,
//     fetcher,
//     {
//       revalidateIfStale: false,
//       revalidateOnFocus: false,
//       revalidateOnReconnect: false,
//     }
//   );

//   if (errorItem1) {
//     console.log(errorItem1, "get city");
//   }

//   const handleChangeInputElement = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { value, name } = e.target;
//     setSearchValue({ ...searchValue, [name]: value });
//   };
//   const handleChangeSelectElement = async (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const { value, name }: any = e.target;
//     setSearchValue({ ...searchValue, [name]: value });
//   };

//   return (
//     <>
//       <div className="sm:mt-[236px] check_destination_main bg-[lavender] p-[10px] ">
//         <div className="container">
//           <DestinationHeadLine />
//           <div className="sm:block check_destination_sub-main flex items-center">
//             <form
//               // style={{ backgroundImage: `url(${bg_image.src})` }}
//               className="w-[400px]  p-3 text-white form_destination relative"
//               onSubmit={handleSubmit}
//             >
//               <div className="destination_search my-5 relative ">
//                 <p className="my-2">Choose your country</p>
//                 <select
//                   name="CountryName"
//                   value={searchValue.CountryName}
//                   className="text-black w-full mx-0 my-2.5 p-2 rounded-[7px]"
//                   onChange={handleChangeSelectElement}
//                 >
//                   <option>
//                     {!searchValue.CountryName
//                       ? "Select Country..."
//                       : searchValue.CountryName}
//                   </option>
//                   {data instanceof Array &&
//                     data?.map((ele: countryProps) => {
//                       return (
//                         <option key={uuidv4()} value={ele.country_name}>
//                           {ele.country_name}
//                         </option>
//                       );
//                     })}
//                 </select>
//                 <p className="my-2">Choose your state</p>
//                 <select
//                   name="stateName"
//                   value={searchValue.stateName}
//                   className="text-black w-full mx-0 my-2.5 p-2 rounded-[7px]"
//                   onChange={handleChangeSelectElement}
//                 >
//                   <option>
//                     {!searchValue.stateName
//                       ? "Select stateName..."
//                       : searchValue.stateName}
//                   </option>
//                   {item instanceof Array &&
//                     item?.map((ele: any) => {
//                       return (
//                         <option
//                           key={uuidv4()}
//                           className="text-black"
//                           value={ele?.state_name}
//                         >
//                           {ele?.state_name}
//                         </option>
//                       );
//                     })}
//                 </select>
//                 <p className="my-2">Choose your city</p>
//                 <select
//                   name="cityName"
//                   value={searchValue.cityName}
//                   className="text-black w-full mx-0 my-2.5 p-2 rounded-[7px]"
//                   onChange={handleChangeSelectElement}
//                 >
//                   <option>
//                     {!searchValue.cityName
//                       ? "Select stateName..."
//                       : searchValue.cityName}
//                   </option>
//                   {item1 instanceof Array &&
//                     item1?.map((ele: any) => {
//                       return (
//                         <option key={uuidv4()} value={ele?.city_name}>
//                           {ele?.city_name}
//                         </option>
//                       );
//                     })}
//                 </select>
//               </div>
//               <div className="dest_info ">
//                 <div className="flex gap-[20px]  ">
//                   <div>
//                     <label htmlFor="checkInDate "> Check in date</label>
//                     <input
//                       type="date"
//                       name="checkInDate"
//                       value={searchValue.checkInDate}
//                       id=""
//                       className="border w-[100%] border-black text-black rounded-[5px] p-[5px]"
//                       onChange={handleChangeInputElement}
//                     />
//                     {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//                       <DatePicker
//                         label="Helper text example"
//                         slotProps={{
//                           textField: {
//                             // helperText: 'MM/DD/YYYY',
//                           },
//                         }}
//                       />
//                     </LocalizationProvider> */}

//                   </div>
//                   <div>
//                     <label htmlFor="checkOutDate "> Check out date</label>

//                     <input
//                       type="date"
//                       name="checkOutDate"
//                       value={searchValue.checkOutDate}
//                       id=""
//                       className="border w-[100%] border-black text-black rounded-[5px] p-[5px]"
//                       onChange={handleChangeInputElement}
//                     />
//                   </div>
//                 </div>

//                 <input
//                   type="submit"
//                   value="Submit"
//                   className=" submit_button border bg-white text-black mt-[15px] p-[5px]"
//                 />
//                 {/* <button onClick={genrateToken}>Genrate Token</button> */}
//                 {/* {tokenGen && <span>{tokenGen}</span>} */}
//               </div>
//             </form>
//             <div className="make_your_reservation">
//               <div className="sm:w-[100%] p-[10px] make_your_reservation-text w-[50%] mx-auto ">
//                 <h2 className=" text-[38px] font-bold w-[100%] ">Easy scheduling ahead</h2>
//                 <p>
//                 Calendly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time — and so much more.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default CheckDestination;


"use client";
import React, { ReactEventHandler, useEffect, useState } from "react";
import bg_image from "../../assets/offer-3.jpg";
import { fetcher } from "@/helpers/apiHelper";
import useSWR from "swr";
import DestinationHeadLine from "./destinationHeadLine";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

import { v4 as uuidv4 } from "uuid";
import { Span } from "next/dist/trace";
import dayjs, { Dayjs } from "dayjs";
uuidv4();

const CheckDestination = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);


  const baseUrl = "http://localhost:3000";

  const sendEmail = async (e: any) => {
    e.preventDefault();
    const CheckIndDate = checkIn ? dayjs(checkIn).format('YYYY-MM-DD ') : null;
    const CheckOutDate = checkOut ? dayjs(checkOut).format('YYYY-MM-DD ') : null;


    let dataSend = {
      email: email,
      message: message,
      checkIn: CheckIndDate,
      checkOut: CheckOutDate

    };
    console.log(dataSend?.checkIn, "datasend");
    alert(dataSend?.checkOut)

    const res = await fetch(`${baseUrl}/api/meeting`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // HANDLING ERRORS
      .then((res) => {
        console.log(res);
        if (res.status > 199 && res.status < 300) {
          alert("Send Successfully !");
          setEmail('')
          setMessage('')
          setCheckIn(null)
        }
      });
  }
  return (
    <>
      <div className="sm:mt-[236px] check_destination_main bg-[lavender] p-[10px] ">
        <div className="container">
          <DestinationHeadLine />
          <div className="sm:block check_destination_sub-main flex items-center">
            <form
              // style={{ backgroundImage: `url(${bg_image.src})` }}
              className="w-[400px]  p-3 text-white form_destination relative"
              onSubmit={sendEmail}
            >
              <div className="destination_search my-5 relative ">
                {/* <p className="my-2">Choose your country</p> */}
                <p className="my-2">Enter Your Email</p>

                <input
                  type="email"
                  placeholder="Receiver's Email Address"
                  className="text-black w-full mx-0 my-2.5 p-2 rounded-[7px]"
                  onChange={(e) => setEmail(e.target.value)}
                />



                {/* <p className="my-2">Choose your city</p>
                <input
                  onChange={(e) => setMessage(e.target.value)}
                  className="text-black w-full mx-0 my-2.5 p-2 rounded-[7px]"
                  placeholder="Enter your message here..."
                /> */}
                <div className="dest_info ">
                  <div className="flex gap-[20px]  "></div>
                  <div className="Check_IN">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                          label="Check in Date"
                          disablePast
                          value={checkIn}
                          onChange={(e: any) => setCheckIn(e)}
                          className='border w-[100%] border-black text-white rounded-[5px] p-[5px]'
                          slotProps={{
                            textField: {
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="Check_OUT">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                          label="Check Out Date"
                          value={checkOut}
                          onChange={(date) => setCheckOut(date)}
                          className='border w-[100%] border-black text-black rounded-[5px] p-[5px]'
                          slotProps={{
                            textField: {
                            },
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className=" submit_button border bg-white text-black mt-[15px] p-[5px]"
                />
              </div>

            </form>
            <div className="make_your_reservation">
              <div className="sm:w-[100%] p-[10px] make_your_reservation-text w-[50%] mx-auto ">
                <h2 className=" text-[38px] font-bold w-[100%] ">Easy scheduling ahead</h2>
                <p>
                  Calendly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time — and so much more.
                </p>
              </div>
            </div>
          </div>
        </div >
      </div >
    </>
  );
};
export default CheckDestination;
