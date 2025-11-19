"use client"

export default function AccountPage() {
  return (
    <div className="flex p-6 sm:p-10">
      <div className="w-full max-w-2xl bg-white shadow-sm rounded-xl p-6 sm:p-10">
        <h1 className="text-2xl font-semibold mb-6">My account</h1>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-pink-500 flex items-center justify-center text-white text-4xl font-bold">
            q
          </div>
        </div>

        {/* UID */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">UID</label>
          <input
            type="text"
            readOnly
            value="ZEYXPA...mwz5cw7i1"
            className="w-full border rounded-md px-3 py-2 text-gray-700 bg-gray-50"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            readOnly
            value="qinglan"
            className="w-full border rounded-md px-3 py-2 text-gray-700 bg-gray-50"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            readOnly
            value="qinglan666666@gmail.com"
            className="w-full border rounded-md px-3 py-2 text-gray-700 bg-gray-50"
          />
        </div>

        {/* Delete */}
        <button className="text-red-600 text-sm font-medium hover:underline">
          Delete account
        </button>
      </div>
    </div>
  )
}
