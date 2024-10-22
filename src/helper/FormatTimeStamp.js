export const formatTimestamp = (timestamp) => {
    if (timestamp?._seconds) {
      const date = new Date(
        timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
      );
      return date.toLocaleString();
    }
    return "Invalid Timestamp";
  };