import React from "react"
import Image from "next/image"

interface FeaturedProductData {
  Title: { value: string }
  Subtitle: { value: string }
  "Product Name": { value: string }
  "Product Logo": { url: string; alt: string; height: number; width: number }
  "Manufacturer Name": { value: string }
  "Manufacturer Title": { value: string }
  Overview: { value: string }
  Features: { value: string[] }
  Quote: { value: string }
  "Image Gallery": { url: string; alt: string; height: number; width: number }[]
  Specifications: { metric: string; value: string }[]
}

// Sample data
const featuredProductSampleData: FeaturedProductData = {
  Title: { value: "Revolutionary Widget 3000" },
  Subtitle: { value: "Breaking Barriers in Widget Technology" },
  "Product Name": { value: "Widget 3000" },
  "Product Logo": { url: "https://bucket-cms-demo-public.s3.amazonaws.com/images/revolutionary-widget-co-logo.png", alt: "Widget 3000 Logo", height: 150, width: 180 },
  "Manufacturer Name": { value: "WidgetMakers Ltd." },
  "Manufacturer Title": { value: "Leading Innovators in Widget Engineering" },
  Overview: { value: "The Widget 3000 represents a groundbreaking advancement in widget technology, offering unparalleled efficiency and versatility." },
  Features: { value: ["High Efficiency", "User-Friendly Interface", "Compact Design", "Advanced Analytics", "Robust Construction"] },
  Quote: { value: "The Widget 3000 is not just a product, it's a revolution that's set to redefine the widget industry." },
  "Image Gallery": [
    { url: "https://bucket-cms-demo-public.s3.amazonaws.com/images/rev-widget.png", alt: "Widget 3000 Front View", height: 600, width: 600 },
    { url: "https://bucket-cms-demo-public.s3.amazonaws.com/images/rev-widget-side.png", alt: "Widget 3000 Side View", height: 600, width: 600 },
    { url: "https://bucket-cms-demo-public.s3.amazonaws.com/images/rev-widget-back.png", alt: "Widget 3000 Back View", height: 600, width: 600 },
  ],
  Specifications: [
    { metric: "Dimensions", value: "10cm x 10cm x 5cm" },
    { metric: "Weight", value: "500g" },
    { metric: "Power Consumption", value: "10W" },
  ],
}

const FeaturedProduct = ({ data }: { data: FeaturedProductData }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg border shadow-md m-8">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-4xl font-bold">{data.Title.value}</div>
          <div className="text-lg opacity-50 pt-1">{data.Subtitle.value}</div>
        </div>
        <img src={data["Product Logo"].url} alt={data["Product Logo"].alt} className="h-24 w-24 rounded-lg overflow-hidden" />
      </div>
      <div className="mt-8 text-gray-700">{data.Overview.value}</div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data["Image Gallery"].map((image: { url: string; alt: string; height: number; width: number }, index: number) => (
          <Image key={index} src={image.url} alt={image.alt} width={image.width} height={image.height} className="w-full h-64 object-cover rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-2 mb-4">
        <div className="mt-8 pl-4">
          <div className="font-bold">Features:</div>
          <ul className="list-disc ml-5">
            {data.Features.value.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="mt-8 pl-4">
          <div className="font-bold">Specifications:</div>
          <ul className="list-disc ml-5">
            {data.Specifications.map((spec: { metric: string; value: string }, index: number) => (
              <li key={index}>{`${spec.metric}: ${spec.value}`}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-8 text-center">
        <div className="italic font-thin text-3xl text-gray-700">“{data.Quote.value}”</div>
      </div>
    </div>
  )
}

export const FeaturedProducts: React.FC = () => {
  return (
    <div>
      <FeaturedProduct data={featuredProductSampleData} />
    </div>
  )
}
