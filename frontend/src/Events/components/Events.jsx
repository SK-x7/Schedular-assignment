function Events() {
    return (
        <div className="bg-blue-200 w-full px-11 flex flex-col gap-6">
        <h1 className="text-3xl">Events</h1>
        <div className=" w-full px-6 rounded-lg grid grid-cols-2 gap-5">
          {/* event card */}
          <div className="bg-white rounded-lg px-5 py-5 flex flex-col gap-3">
            <div className="flex flex-col">
            <h1 className="text-2xl">Event 1</h1>
            <span className="text-gray-600 text-xs">30 mins</span>
            </div>
            <p className="text-sm">This is your first event in which we will discusss everything</p>
            <div className="flex gap-4">
              <button>Copy link</button>
              <button>Delete</button>
            </div>
          </div>
          <div className="bg-white">
            <div className="flex flex-col">
            <h1 className="text-2xl">Event 1</h1>
            <span className="text-gray-600 text-xs">30 mins</span>
            </div>
            <p className="text-sm">This is your first event in which we will discusss everything</p>
            <div className="flex gap-4">
              <button>Copy link</button>
              <button>Delete</button>
            </div>
          </div>
          <div className="bg-white">
            <div className="flex flex-col">
            <h1 className="text-2xl">Event 1</h1>
            <span className="text-gray-600 text-xs">30 mins</span>
            </div>
            <p className="text-sm">This is your first event in which we will discusss everything</p>
            <div className="flex gap-4">
              <button>Copy link</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Events
