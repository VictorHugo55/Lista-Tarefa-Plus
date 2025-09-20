import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTasks, Task } from "../src/services/useTasks";
import { useQuote } from "../src/api/useQuote";
import { useTheme } from "../src/context/ThemeContext";
import { useTranslation } from "react-i18next";


export default function TasksScreen() {
  const router = useRouter();
  const {colors} = useTheme();
  const { tasks, loading, updateTask, deleteTask } = useTasks();
  const { data: quote, isLoading: loadingQuote } = useQuote();
  const {t} = useTranslation();

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#007AFF"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );

  const handleEdit = (task: Task) => {
    router.push(
      `/TasksFormScreen?task=${encodeURIComponent(JSON.stringify(task))}`
    );
  };

  const handleAdd = () => {
    router.push("/TasksFormScreen");
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:colors.background}]}>
      {/* Frase motivacional da API */}
      <View style={styles.quoteBox}>
        {loadingQuote ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : (
          <>
            <Text style={styles.quoteText}>
              "{quote?.content || "Mantenha o foco!"}"
            </Text>
            <Text style={styles.quoteAuthor}>— {quote?.author || "Anônimo"}</Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>{t("newTask")}</Text>
      </TouchableOpacity>

      {tasks.length === 0 ? (
        <Text style={styles.empty}>Nenhuma tarefa encontrada</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleEdit(item)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  updateTask(item.id!, { completed: !item.completed })
                }
              >
                <Text style={{ color: "#28a745" }}>
                  {item.completed ? "✓" : "⏳"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item.id!)}>
                <Text style={{ color: "#dc3545" }}>🗑</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
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
    borderWidth:3.5,
    borderColor: '#585858'
  },
  title: { fontSize: 16, fontWeight: "bold" },
  desc: { fontSize: 14, color: "#555" },
  quoteBox: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  quoteText: { fontSize: 14, fontStyle: "italic", color: "#333" },
  quoteAuthor: { marginTop: 4, fontSize: 12, color: "#555", textAlign: "right" },
});
