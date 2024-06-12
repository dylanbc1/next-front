'use client'
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardFooter } from '../ui/card';
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface PropertyProps {
  id: string;
  name: string;
  cost_per_night: number;
  city: string;
  country: string;
  image: string;
}

export const PropertyList = ({ properties }: { properties: PropertyProps[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const sliderRef = useRef<Slider>(null);

  const handleNextPage = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePreviousPage = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '25%',
    afterChange: (index: number) => {
      setCurrentPage(index + 1);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '20%',
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerPadding: '15%',
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: '10%',
        }
      }
    ]
  };

  return (
    <Card className="w-[1000px] shadow-md mx-auto mt-20"> 

      <CardHeader>
        <p className="text-2xl font-semibold text-center">Properties</p>
        <Link href={`/propertyForm/`}>
          <button type="submit" className="p-2 rounded bg-blue-500 text-white hover:bg-blue-700">
            +
          </button>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative w-full">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 px-4 py-2 rounded-l z-10"
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <Slider ref={sliderRef} {...settings}>
            {properties.map((property) => (
              <div key={property.id} className="p-4">
                <div className="group relative">
                  <div className="w-full h-80 rounded-md bg-gray-200 overflow-hidden group-hover:opacity-75 transition-transform transform-gpu group-focus:scale-105">
                    <img src={property.image} alt="Property image" className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link href={`/properties/${property.id}`} key={property.id}>
                          <span aria-hidden="true" className="absolute inset-0"></span>
                          {property.city}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{property.country}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${property.cost_per_night}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 px-4 py-2 rounded-r z-10"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center mt-4">
        <span>
          Page {currentPage} of {properties.length}
        </span>
      </CardFooter>
    </Card>
  );
};
