import React from "react"
import Image from "next/image"

type TestimonialProps = {
  name: string
  title: string
  image: string
  text: string
}

const Testimonial: React.FC<TestimonialProps> = ({ name, title, image, text }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image width={96} height={96} className="h-48 w-full object-cover" src={image} alt={name} />
        </div>
        <div className="p-6">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
          <div className="block text-3xl leading-tight font-semibold text-black hover:underline mb-2">{name}</div>
          <p className="mt-2 text-gray-500">{text}</p>
        </div>
      </div>
    </div>
  )
}

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Jane Smith",
      title: "Product Manager",
      image: "https://bucket-cms.s3.amazonaws.com/images/examples/testimonial-1.png",
      text: "Amazing service and top-notch support. Can’t go wrong with this purchase.",
    },
    {
      name: "John Doe",
      title: "Senior Engineer",
      image: "https://bucket-cms.s3.amazonaws.com/images/examples/testimonial-2.png",
      text: "This product has changed the way we operate. Highly recommend!",
    },
    {
      name: "Chuck Jones",
      title: "Sales Manager",
      image: "https://bucket-cms.s3.amazonaws.com/images/examples/testimonial-3.png",
      text: "Amazing service and top-notch support. Can’t go wrong with this purchase.",
    },
    {
      name: "Lester Davis",
      title: "CFO",
      image: "https://bucket-cms.s3.amazonaws.com/images/examples/testimonial-4.png",
      text: "This product has changed the way we operate. Highly recommend!",
    },
  ]

  return (
    <div className="w-[960px] mx-auto text-center flex-none">
      <h2 className="text-2xl lg:text-4xl font-light mb-8 opacity-70">What our customers say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
