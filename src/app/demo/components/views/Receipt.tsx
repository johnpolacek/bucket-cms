"use client"
import React from "react"

function Receipt({ id, createdDate, amount }: { id: string; createdDate: string; amount: string }) {
  function printReceipt() {
    typeof window === "object" && window.print()
  }

  return (
    <div id="receipt" className="bg-white p-8 sm:p-12 border rounded-lg font-mono shadow-lg max-w-md mx-auto mt-4">
      <div className="flex justify-end -mt-8 -mr-6 mb-6 print:hidden">
        <button onClick={printReceipt} className="text-blue-500 font-sans">
          Print Receipt
        </button>
      </div>
      <h2 className="text-xl font-bold mb-6">Payment Receipt</h2>

      <div className="mb-4">
        <span className="block text-gray-500 text-sm">Status:</span>
        <span className="block text-green-600">Succeeded - {createdDate}</span>
      </div>

      <div className="mb-4">
        <span className="block text-gray-500 text-sm">Payment ID:</span>
        <span className="block text-black">{id}</span>
      </div>

      <div className="mb-4">
        <span className="block text-gray-500 text-sm">Product:</span>
        <span className="block text-black">Bucket CMS Commercial Project License</span>
      </div>

      <div className="mb-4">
        <span className="block text-gray-500 text-sm">Amount:</span>
        <span className="block text-black">${amount} USD</span>
      </div>

      <div className="mb-4">
        <span className="block text-gray-500 text-sm">Payment Method:</span>
        <span className="block text-black">Card</span>
      </div>
    </div>
  )
}

export default Receipt
