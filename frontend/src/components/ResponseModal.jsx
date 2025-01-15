export default function ResponseModal({ partnership, setIsModalOpen, handleRespond, responseMessage, setResponseMessage  }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
                <h2 className="text-2xl font-semibold mb-4">Respond to Partnership</h2>
                <textarea
                    className="w-full p-2 border rounded-md mb-4 h-40"
                    placeholder="Enter your response message..."
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                ></textarea>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 flex-1"
                    >   
                        Close
                    </button>
                    <button
                        onClick={() => handleRespond('approved')}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex-1"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handleRespond('rejected')}
                        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex-1"
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
}