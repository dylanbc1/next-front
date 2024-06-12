'use client';
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { useState } from 'react';

interface Property {
    id: string;
    name: string;
    cost_per_night: number;
    city: string;
    country: string;
    image: string;
    type: string;
    address: string;
    latitude: number;
    longitud: number;
    rooms: number;
    bathrooms: number;
    area: number;
    max_people: number;
    slug: string;
}

interface PropertyInfoProps {
    property?: Property | null
}

export const PropertyInfo = ( {property} : PropertyInfoProps) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const handleImageClick = () => {
        setIsImageModalOpen(!isImageModalOpen);
    };
    return (
        <>
        <Card className="w-[600px] shadow-md">
            <CardContent className="space-y-2">
                <div className="bg-white">
                    <div className="pt-4">
                        <div className="mx-auto max-w-xs sm:px-4 lg:grid lg:max-w-md lg:grid-cols-3 lg:gap-x-4 lg:px-4">
                        <div className="overflow-hidden rounded-lg lg:block cursor-pointer" onClick={handleImageClick}>
                                <img src={property?.image} alt="Property image" className="h-full w-full object-cover object-center"/>
                            </div>
                        </div>

                        <div className="mx-auto max-w-xs px-2 pb-8 pt-6 sm:px-4 lg:grid lg:max-w-md lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-4 lg:px-4 lg:pb-12 lg:pt-10">
                            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-6">
                                <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">{property?.country}</h1>
                                <h2 className="text-xs tracking-tight text-gray-700 sm:text-xl">{property?.city}</h2>
                            </div>

                            <div className="mt-2 lg:row-span-3 lg:mt-0">
                               
                                <p className="text-xl tracking-tight text-gray-900">$ {property?.cost_per_night}</p>
                                <p className="text-sm text-gray-500">per night</p>

                                <form className="mt-6">
                                    <Link href={`/bookingForm/${property?.id}`}>
                                        <button type="submit" className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-400 px-6 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            Book!
                                        </button>
                                    </Link>
                                   
                                </form>
                            </div>

                            <div className="py-6 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-8 lg:pr-6 lg:pt-4">
                                
                                <div className="mt-6">
                                    <h3 className="text-xs font-medium text-gray-900">Amenities</h3>
                                    <div className="mt-2">
                                        <ul role="list" className="list-disc space-y-1 pl-4 text-xs">
                                            <li className="text-gray-400"><span className="text-gray-600 font-semibold">Address</span>: {property?.address}</li>
                                            <li className="text-gray-400"><span className="text-gray-600 font-semibold">Square meters</span>: {property?.area}</li>
                                            <li className="text-gray-400"><span className="text-gray-600 font-semibold">Bathrooms</span>: {property?.bathrooms}</li>
                                            <li className="text-gray-400"><span className="text-gray-600 font-semibold">Rooms</span>: {property?.rooms}</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h2 className="text-xs font-medium text-gray-900">Find By</h2>
                                    <div className="mt-2 space-y-4">
                                        <p className="text-xs text-gray-600">{property?.slug}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
        {isImageModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75" onClick={handleImageClick}>
                    <img src={property?.image} alt="Property image" className="max-w-3xl max-h-3xl"/>
                </div>
            )}
        </>
    )
}