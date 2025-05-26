import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { increment, decrement } from "../../store/slices/counterSlice";
import { apiService } from "../../api/apiService";
import { API_ENDPOINTS } from "../../api/apiConfig/endpoints";

// Example interface for the API response
interface ExampleData {
  id: number;
  title: string;
  description: string;
}

const HomeScreen = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [data, setData] = useState<ExampleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get<ExampleData>(
        API_ENDPOINTS.HOME.EXAMPLE
      );
      setData(response);
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </View>

      {/* API Data Display */}
      <View style={styles.apiContainer}>
        <Text style={styles.sectionTitle}>API Data Example</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : data ? (
          <View style={styles.dataContainer}>
            <Text style={styles.dataTitle}>{data.title}</Text>
            <Text style={styles.dataDescription}>{data.description}</Text>
          </View>
        ) : (
          <Text>No data available</Text>
        )}
        <Button title="Refresh Data" onPress={fetchData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  apiContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  dataContainer: {
    width: "100%",
    marginBottom: 15,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  dataDescription: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "red",
    marginBottom: 15,
  },
});

export default HomeScreen;
