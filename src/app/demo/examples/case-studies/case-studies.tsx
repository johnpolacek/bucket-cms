import React from "react"
import Image from "next/image"

interface CustomerCaseStudyData {
  data: {
    Title: { value: string }
    Subtitle: { value: string }
    "Client Name": { value: string }
    "Client Logo": { url: string; alt: string; height: number; width: number }
    "Customer Name": { value: string }
    "Customer Title": { value: string }
    Overview: { value: string }
    Services: { value: string[] }
    Quote: { value: string }
    "Image Gallery": { url: string; alt: string; height: number; width: number }[]
    Results: { metric: string; value: string }[]
  }
}

const CustomerCaseStudyView: React.FC<CustomerCaseStudyData> = ({ data }) => {
  return (
    <div className="pb-12 w-full">
      <div className="py-12 text-center">
        <h4 className="uppercase tracking-wide text-sm opacity-60">Case Study</h4>
        <h1 className="text-5xl font-semibold py-4">{data["Title"].value}</h1>
        <h2 className="text-lg text-gray-600 max-w-[540px] mx-auto">{data["Subtitle"].value}</h2>
        <h3 className="text-xl mt-2"></h3>
      </div>
      <div className="border-t border-b">
        <div className="mx-auto max-w-[960px]">
          <div className="grid grid-cols-3">
            <div className="p-4 border-l">
              <div className="font-semibold">Client</div>
              <div>{data["Client Name"].value}</div>
            </div>
            <div className="p-4 border-l">
              <div className="font-semibold">Year</div>
              <div>{new Date().getFullYear()}</div>
            </div>
            <div className="p-4 border-l border-r">
              <div className="font-semibold">Services</div>
              <div>{data["Services"].value.join(", ")}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3">
        {data["Image Gallery"].map((img: any, index: number) => (
          <Image key={index} className="object-cover" src={img.url} alt={img.alt} height={img.height} width={img.width} />
        ))}
      </div>

      <div className="py-8 px-4 max-w-[960px] mx-auto">
        <blockquote className="font-thin italic text-4xl px-16 pb-8 text-center">
          <sup className="font-serif text-2xl scale-150">“</sup>
          {data["Quote"].value}
          <sup className="font-serif ftext-2xl scale-150 relative -top-[2px] -left-1">”</sup>
        </blockquote>
        <h3 className="font-medium text-4xl pb-4">Overview</h3>
        <div className="text-gray-500" dangerouslySetInnerHTML={{ __html: data["Overview"].value }}></div>
      </div>
    </div>
  )
}

export const CaseStudies: React.FC = () => {
  const example = {
    itemName: "Content Freedom: A Bucket CMS Success Story",
    data: {
      Title: { value: "Content Freedom: A Bucket CMS Success Story" },
      Subtitle: { value: "The transformative portability of Bucket CMS sets a new standard, enabling effortless setup without the need for a database." },
      "Client Name": { value: "Creative Horizons Ltd" },
      "Client Logo": { url: "https://s3.us-east-1.amazonaws.com/bucket-cms-demo-public/images/1696110801693-Screen Shot 2023-09-30 at 4.53.02 PM.png", width: 0, height: 0, alt: "Placeholder Logo" },
      "Customer Name": { value: "Heather Christensen" },
      "Customer Title": { value: "Chief Product Officer" },
      Overview: {
        value:
          "<p>At Creative Horizons Ltd., we have always strived to stay at the forefront of digital innovation. Our quest for a robust, yet flexible content management system led us to explore the promising realm of headless CMS. This is when we stumbled upon Bucket CMS—a portable drop-in headless CMS designed for Next.js, requiring no database setup. Intrigued and hopeful, we decided to transition our content management operations to Bucket CMS, and the results were nothing short of transformative.</p><p><br></p><p><strong>Ease of Setup</strong></p><p>The initial setup of Bucket CMS was a breeze. With no database necessary, we eradicated the usual setup hurdles, accelerating our transition phase significantly. The documentation provided was clear, comprehensive, and enabled our team to get the CMS up and running in no time.</p><p><br></p><p><strong>Portability</strong></p><p>The portability of Bucket CMS was a game-changer for us. It seamlessly integrated with our existing Next.js framework, allowing us to manage and deploy content across various platforms effortlessly. This portability unleashed a new level of flexibility, helping us to meet the diverse content management needs of our projects with ease.</p><p><br></p><p></p>",
      },
      Services: { value: ["Design / UX", "Frontend", "Infra"] },
      Quote: { value: "The journey with Bucket CMS has been exhilarating, and the success, tangible." },
      "Image Gallery": [
        {
          url: "https://s3.us-east-1.amazonaws.com/bucket-cms-demo-public/images/1696111568550-johnpolacek_happiness._blue_buckets_everywhere_861d487e-48f8-4719-83ec-ff48a39b3fae.png",
          width: 1456,
          height: 816,
          alt: "Blue Buckets Stacked",
        },
        {
          url: "https://s3.us-east-1.amazonaws.com/bucket-cms-demo-public/images/1696111579147-johnpolacek_happiness._buckets_everywhere_c0aaabec-8c88-4e0c-9d1a-ea4732537249.png",
          width: 1456,
          height: 816,
          alt: "Smily bucket people",
        },
        {
          url: "https://s3.us-east-1.amazonaws.com/bucket-cms-demo-public/images/1696111613047-johnpolacek_blue_buckets_in_the_blue_sky_5448f076-ca94-4a61-9d7b-3268c0711b32.png",
          width: 1456,
          height: 816,
          alt: "Blue Buckets with flowers",
        },
      ],
      Results: [{ value: "2000%", metric: "Satisfaction" }],
    },
  }

  return (
    <div>
      <CustomerCaseStudyView data={example.data} />
    </div>
  )
}
