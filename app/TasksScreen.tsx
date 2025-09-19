import React from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTasks, Task } from "../src/services/useTasks";

export default function TasksScreen() {
  const router = useRouter();
  const { tasks, loading, updateTask, deleteTask } = useTasks();

  if (loading) return <ActivityIndicator size="large" color="#007AFF" style={{ flex: 1, justifyContent: "center" }} />;

  const handleEdit = (task: Task) => {
    router.push(`/tasks/form?task=${encodeURIComponent(JSON.stringify(task))}`);
  };

  const handleAdd = () => {
    router.push("/tasks/form");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>+ Nova Tarefa</Text>
      </TouchableOpacity>

      {tasks.length === 0 ? (
        <Text style={styles.empty}>Nenhuma tarefa encontrada</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleEdit(item)}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>

              <TouchableOpacity onPress={() => updateTask(item.id!, { completed: !item.completed })}>
                <Text style={{ color: "#28a745" }}>{item.completed ? "✓" : "⏳"}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item.id!)}>
                <Text style={{ color: "#dc3545" }}>🗑</Text>
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
  addButton: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8, marginBottom: 16, alignItems: "center" },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  empty: { textAlign: "center", marginTop: 50, color: "#555" },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 12, marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: "bold" },
  desc: { fontSize: 14, color: "#555" },
});
