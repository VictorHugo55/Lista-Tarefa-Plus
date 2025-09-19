// screens/TaskListScreen.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useTasks } from "../src/services/useTasks";

export default function TaskListScreen() {
  const router = useRouter();
  const { tasks, loading, deleteTask, updateTask } = useTasks();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/create")}
      >
        <Text style={styles.addButtonText}>+ Nova Tarefa</Text>
      </TouchableOpacity>

      {tasks.length === 0 ? (
        <Text style={styles.empty}>Nenhuma tarefa encontrada</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/details/${item.id}`)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() =>
                  updateTask(item.id, { completed: !item.completed })
                }
              >
                <Text style={{ color: "#fff" }}>
                  {item.completed ? "✓" : "⏳"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={{ color: "#fff" }}>🗑</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  empty: { textAlign: "center", marginTop: 50, color: "#555" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 16, fontWeight: "bold" },
  desc: { fontSize: 14, color: "#555" },
  doneButton: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 6,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
