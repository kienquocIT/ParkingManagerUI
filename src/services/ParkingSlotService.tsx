export const getAllParkingSlots = async () => {
    try {
        const response = await fetch(
            "https://20993r9qpf.execute-api.ap-southeast-1.amazonaws.com/parking/parking-state",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("❌ Lỗi khi gọi API parking-state:", error);
        throw error;
    }
};
