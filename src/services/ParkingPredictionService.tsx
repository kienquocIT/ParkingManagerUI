export const getParkingPrediction = async () => {
    try {
        const response = await fetch(
            "https://20993r9qpf.execute-api.ap-southeast-1.amazonaws.com/parking/parking-prediction",
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

export const getParkingPredictionMAE = async () => {
    try {
        const response = await fetch(
            "https://20993r9qpf.execute-api.ap-southeast-1.amazonaws.com/parking/parking-mae",
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