import React from 'react'

export const Extraction = (props) => {
    

    return (
        <>
           
            <div className=" z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{
                position: "absolute",
                display: "flex",
                height: "85vh",
                alignItems: "center",

            }}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">

                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">

                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 " id="modal-title" style={{ paddingTop: "0.75rem" }}>
                                        Weather Report
                                    </h3>
                                    <div className="mt-2">
                                        <div className="px-4 pt-3 sm:px-6 sm:flex sm:flex-row-reverse" style={{ justifyContent: "space-evenly", alignItems: "center" }}>
                                            <img src={props.icon} />
                                            <h1 className='font-bold text-4xl'>
                                                {(props.temp - 273.15).toFixed(2)}&deg;C
                                            </h1>
                                        </div>

                                        <div className="font-bold text-xl">
                                            {props.weatherMain}
                                        </div>
                                        <div>
                                            Cloudiness: {props.cloud}%
                                        </div>
                                        <div>
                                            Max Temp: {(props.temp_max - 273.15).toFixed(2)}&deg;C
                                        </div>
                                        <div>
                                            Min Temp: {(props.temp_min - 273.15).toFixed(2)}&deg;C
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



        </>

    )
}

